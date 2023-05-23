import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import CardPharm from './pharmacyCard';


export default function Grouped() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zones, setZones] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedZone, setSelectedZone] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    axios.get('/api/ville/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        setCities(response.data.map(city => ({ id: city.id, name: city.nom })));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCityChange = (event, value) => {
    setSelectedCity(value);
    setSearchText('');
    if (value) {
      const accessToken = localStorage.getItem('access_token');
      axios.get(`/api/zone/ville/${value.name}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => {
          setZones(response.data.map(zone => ({ id: zone.id, name: zone.nom })));
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setZones([]);
    }
  };
  const handleZoneChange = (event, value) => {
    setSelectedZone(value);
  };
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          label="Search by pharmacy"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: 500, margin: '15px' }}
        />
        <Autocomplete
          id="cities-autocomplete"
          options={cities}
          getOptionLabel={option => option.name}
          value={selectedCity}
          sx={{ width: 300, margin: '15px' }}
          onChange={handleCityChange}
          renderInput={params => (
            <TextField {...params} label="Cities" variant="outlined" />
          )}
        />
        <Autocomplete
          id="zones-autocomplete"
          options={zones}
          sx={{ width: 300, margin: '15px' }}
          getOptionLabel={option => option.name}
          onChange={handleZoneChange}
          renderInput={params => (
            <TextField {...params} label="Zones" variant="outlined" disabled={!selectedCity} />
          )}
        />
      </div>
      <CardPharm searchText={searchText} selectedZone={selectedZone} />
     
    </>
  );
}
