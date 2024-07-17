import React from 'react';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{ width: '100%', overflow: 'hidden' }}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, width: '100%', maxHeight: '100%', overflowY: 'auto' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPanel;
