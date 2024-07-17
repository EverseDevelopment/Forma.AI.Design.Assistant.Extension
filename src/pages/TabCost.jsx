import './StylePages.css';
import React from 'react';
import Box from '@mui/material/Box';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    Title
);

function TabCost({apiResponse }) {
    const data = {
        labels: ['Lot', 'Materials', 'Labour', 'Total Cost', 'Safety'],
        datasets: [
            {
                label: 'Project 01',
                data: [65, 59, 90, 81, 56], // Example data, you can replace it with dynamic data
                backgroundColor: 'rgba(34, 202, 236, 0.2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(34, 202, 236, 1)'
            },
            {
                label: 'Project 02',
                data: [20, 71, 55, 82, 66], // Example data, you can replace it with dynamic data
                backgroundColor: 'rgba(255, 177, 193, 0.2)',
                borderColor: 'rgba(255, 177, 193, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(255, 177, 193, 1)'
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false,
                text: 'Project Metrics Radar Chart'
            }
        },
        scales: {
            r: {
                beginAtZero: true
            }
        }
    };

    return (
        <Box sx={{ p: 0, width: '100%', maxHeight: '100%', overflowY: 'auto' }}>
            <div className="container">
                <div className="content">
                    <p className="result-text"> {apiResponse} </p>
                    <div className="spacer"></div>
                    <div className="chart-container">
                        <div className="chart-text">
                            <h2 className="main-title">Project Suggestions</h2>
                            <p className="main-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                                nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <div className="chart">
                            <Radar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default TabCost;
