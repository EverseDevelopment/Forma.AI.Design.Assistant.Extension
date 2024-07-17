// dataFetcher.js
import { Forma } from 'forma-embedded-view-sdk/auto';

const calculatePolygonArea = (coordinates) => {
    let area = 0;
    const n = coordinates.length - 1; // Ignore the last point

    for (let i = 0; i < n; i++) {
        const [x1, y1] = coordinates[i];
        const [x2, y2] = coordinates[(i + 1) % n];
        area += x1 * y2 - x2 * y1;
    }
    return Math.abs(area) / 2;
};

const calculateBuildingHeight = (mesh) => {
    let minHeight = Infinity;
    let maxHeight = -Infinity;

    for (let i = 2; i < mesh.length; i += 3) { // Start at the third element and step by 3
        const z = mesh[i];
        if (z < minHeight) minHeight = z;
        if (z > maxHeight) maxHeight = z;
    }
    return maxHeight - minHeight;
};

export const fetchData = async () => {
    try {
        const [location, project, siteLimitPaths, buildingPaths] = await Promise.all([
            Forma.project.getGeoLocation(),
            Forma.project.get(),
            Forma.geometry.getPathsByCategory({ category: "site_limit" }),
            Forma.geometry.getPathsByCategory({ category: "building" })
        ]);
        let siteLimitFootprint = null;
        let siteSurface = null;

        if (siteLimitPaths.length === 1) {
            siteLimitFootprint = await Forma.geometry.getFootprint({ path: siteLimitPaths[0] });
            if (siteLimitFootprint.type === "Polygon" && siteLimitFootprint.coordinates.length > 0) {
                const coordinates = siteLimitFootprint.coordinates;
                siteSurface = calculatePolygonArea(coordinates);
            }
        }

        let buildingHeight = null;
        if (buildingPaths.length > 0) {
            const mesh = await Forma.geometry.getTriangles({ path: buildingPaths[0] });

            buildingHeight = calculateBuildingHeight(mesh);
        }

        const projectData = {
            countrycode: project.countryCode,
            projstring: project.projString,
            refpoint: project.refPoint,
            strid: project.srid,
            timezone: project.timezone,
            geolocation: location,
            siteLimitFootprint: siteLimitFootprint,
            siteSurface: siteSurface,
            buildingHeight: buildingHeight,
            coordinateSystem: project.projString // Assuming projString contains information about the coordinate system
        };

        // Log the projectData object itself
        console.log('Project Data:', projectData);
        
        return JSON.stringify(projectData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
