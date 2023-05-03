import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import CardPharm from './pharmacyCard';


export default function Grouped() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get('/api/ville/all')
      .then(response => {
        setCities(response.data.map(city => ({ id: city.id, name: city.nom })));
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCityChange = (event, value) => {
    setSelectedCity(value);
    if (value) {
      axios.get(`/api/zone/ville/${value.name}`)
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

  return (
    <>
    <div style={{ display: 'flex', flexWrap: 'wrap' ,marginTop:'10px',alignItems:'center'}}>
         <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        sx={{ width: 500, margin: '15px' }}
        disableClearable
        options={top100Films.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
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
        renderInput={params => (
          <TextField {...params} label="Zones" variant="outlined" disabled={!selectedCity} />
        )}
      />
     
    </div>
     <CardPharm/>
     </>
  );
}
const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 }]
