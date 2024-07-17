import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { fetchData } from './dataFetcher';
import { useState, useEffect } from 'preact/hooks';
import './style.css';
import TabChatbot from './pages/TabChatbot';
import TabPanel from './components/TabPanel'; 
import TabCost from './pages/TabCost';
import TabLocation from './pages/TabLocation';
import { Forma } from 'forma-embedded-view-sdk/auto';

export default function App() {
    const [value, setValue] = React.useState(0);
    const [apiResponse, setApiResponse] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [mergedData, setMergedData] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setMergedData(data);
        };
        getData();
    }, []);

    useEffect(() => {
        const rootUrn = async () => {
            const data = await Forma.proposal.getRootUrn()
            console.log(data);
        };
        rootUrn();
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Cost" sx={{ fontSize: '85%', padding: '6px 12px' }} />
                    <Tab label="Location" sx={{ fontSize: '85%', padding: '6px 12px' }} />
                    <Tab label="Environmental" sx={{ fontSize: '85%', padding: '6px 12px' }} />
                    <Tab label="Sustainability" sx={{ fontSize: '85%', padding: '6px 12px' }} />
                    <Tab label="Chatbot" sx={{ fontSize: '85%', padding: '6px 12px' }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {/* Content for Tab 1 */}
                <TabCost 
                    apiResponse={apiResponse}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                {/* Content for Tab 2 */}
                <TabLocation
                    apiResponse={apiResponse}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {/* Content for Tab 3 */}
                <TabLocation
                    apiResponse={apiResponse}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                {/* Content for Tab 4 */}
                <TabLocation
                    apiResponse={apiResponse}
                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                {/* Content for Tab 5 */}
                <TabChatbot 
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    apiResponse={apiResponse}
                    mergedData={mergedData}
                    setApiResponse={setApiResponse}
                />
            </TabPanel>
        </Box>
    );
}

