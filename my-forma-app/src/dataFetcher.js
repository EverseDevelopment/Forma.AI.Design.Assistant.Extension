// dataFetcher.js
import { Forma } from 'forma-embedded-view-sdk/auto';

export const fetchData = async () => {
    try {
        const [location, project] = await Promise.all([
            Forma.project.getGeoLocation(),
            Forma.project.get()
        ]);
        
        const projectData = {
            countrycode: project.countryCode,
            projstring: project.projString,
            refpoint: project.refPoint,
            strid: project.srid,
            timezone: project.timezone,
            geolocation: location
        };
        
        return JSON.stringify(projectData);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
