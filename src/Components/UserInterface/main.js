import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function Grouped() {
    const [options, setOptions] = useState([]);
    const [error, setError] = useState(null);
    const [zoneOptions, setZoneOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/ville/all')
            .then(response => {
                setOptions(response.data.map(item => ({ id: item.id, title: item.nom, firstLetter: item.nom.charAt(0).toUpperCase() })));
            })
            .catch(error => {
                console.error(error);
                setError(error);
            });
    }, []);

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }




    const handleCityChange = (event, value) => {
        setSelectedCity(value);
        axios.get(`http://localhost:8080/api/zone/ville/${value.title}`)
            .then(response => {
                setZoneOptions(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            <Autocomplete
                id="grouped-demo"
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) => option.id === value.id} // compare the ID property
                sx={{ width: 300, margin: '10px' }}
                renderInput={(params) => <TextField {...params} label="Filter by cities" />}
            />
            <Autocomplete
                sx={{ width: '300px', margin: '10px' }}
                id="autocomplete2"
                options={zoneOptions}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField {...params} label="Zone" variant="outlined" />
                )}
                disabled={!selectedCity}
                onChange={(event, value) => handleCityChange(event, value)}
            />
        </div>
    );
}


