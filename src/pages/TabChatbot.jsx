import React from 'react';
import Box from '@mui/material/Box';
import './StylePages.css';

function TabChatbot({ inputValue, handleInputChange, apiResponse, mergedData, setApiResponse }) {
    const fetchApiResponse = async () => {
        try {
            const response = await fetch('https://formaapi.e-verse.com/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'tPH4Gsq6yd9eJ91iksUmB6pRIw7H33Zy5yIOGEPk'
                },
                body: JSON.stringify({
                    body: `${mergedData} The previous data is a json from a architecture project being designed please take it into consideration
                    to answer the following question. Please keep it brief and nood need to explain on what is based the answer.  ${inputValue}`
                }) // Send inputValue as the body
            });
            const data = await response.json();
            const message = JSON.parse(data.body);
            setApiResponse(message.message);
        } catch (error) {
            console.error('Error fetching API response:', error);
        }
    };

    return (
        <Box sx={{ p: 0, width: '100%', maxHeight: '100%', overflowY: 'auto' }}>
            <div className="container">
                <div className="content" id="chatbot-content">
                    <p className="label">Input Query</p>
                    <input 
                        type="text" 
                        value={inputValue} 
                        onChange={handleInputChange} 
                        className="input"
                    />
                    <p className="label" id="api-response-label">API Response</p>
                    <p className="result-text"> {apiResponse} </p>
                    <div className="spacer"></div>
                    <button onClick={fetchApiResponse} className="button">Make a Question</button>
                </div>
            </div>
        </Box>
    );
}

export default TabChatbot;