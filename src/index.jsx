import { h, render } from 'preact';
import './style.css';
import { Forma } from 'forma-embedded-view-sdk/auto';
import { useState, useEffect } from 'preact/hooks';
import { fetchData } from './dataFetcher';

function App() {
    const [apiResponse, setApiResponse] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [mergedData, setMergedData] = useState('');

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setMergedData(data);
            console.log('Project Data:', data);
        };
        getData();
    }, []);

    const fetchApiResponse = async () => {
        try {
            const response = await fetch('https://formaapi.e-verse.com/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '000000000000000000000'
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

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="container">
            <div className="content">
                <p className="label">Input Query</p>
                <input 
                    type="text" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                    className="input"
                />
                <p className="label" id="api-response-label">API Response</p>
                <p className="result-text"> {apiResponse} </p>
            </div>
            <div className="spacer"></div>
            <button onClick={fetchApiResponse} className="button">Make a Question</button>
        </div>
    );
}

render(<App />, document.getElementById('app'));
