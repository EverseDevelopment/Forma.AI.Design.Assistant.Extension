// import { render } from 'preact';
// import { LocationProvider, Router, Route } from 'preact-iso';

// import { Header } from './components/Header.jsx';
// import { Home } from './pages/Home/index.jsx';
// import { NotFound } from './pages/_404.jsx';
// import './style.css';

// export function App() {
// 	return (
// 		<LocationProvider>
// 			<Header />
// 			<main>
// 				<Router>
// 					<Route path="/" component={Home} />
// 					<Route default component={NotFound} />
// 				</Router>
// 			</main>
// 		</LocationProvider>
// 	);
// }

// render(<App />, document.getElementById('app'));

import { h, render } from 'preact';
import './style.css';
import { Forma } from 'forma-embedded-view-sdk/auto';
import { useState, useEffect } from 'preact/hooks';

function App() {
    const [buildingPaths, setBuildingPaths] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            Forma.geometry
                .getPathsByCategory({ category: 'building' })
                .then(setBuildingPaths);
        };
        fetchData();
    }, []);

    return (
        <div class="section">
            <p>Total number of buildings: {buildingPaths?.length}</p>
        </div>
    );
}

render(<App />, document.getElementById('app'));
