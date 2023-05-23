import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ZoneForm() {
  const [zoneNom, setZoneNom] = useState('');
  const [selectedVille, setSelectedVille] = useState(null);
  const [villes, setVilles] = useState([]);



  useEffect(() => {
    // Fetch data for villes from Spring API using Axios
    axios
      .get('/api/ville/all')
      .then((response) => {
        setVilles(response.data);
      })
      .catch((error) => {
        console.log('Error fetching villes:', error);
      });
  }, []);

  const handleZoneNomChange = (event) => {
    setZoneNom(event.target.value);
  };

  const handleAddZone = () => {
    if (selectedVille) {
      // Create the request payload using the selectedVille's id
      const payload = {
        nom: zoneNom,
        ville: {
          id: selectedVille.id, // Use the id property from selectedVille
        }
      }
      console.log('Selected Ville:', selectedVille);
      console.log('Payload:', payload);
      axios
        .post('/api/zone/save', payload)
        .then((response) => {
          console.log('Zone added successfully:', response.data);
          setZoneNom('');
          setSelectedVille('');
        })
        .catch((error) => {
          console.error('Error adding zone:', error);
        });
    } else {
      console.error('No ville selected');
    }
  };


  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        options={villes}
        getOptionLabel={(ville) => ville.nom}
        onChange={(event, newValue) => {
          setSelectedVille(newValue);
          console.log('Selected Ville:', newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Ville" variant="outlined" />
        )}
      />


      <TextField id="outlined-basic" label="Nom" variant="outlined" value={zoneNom} onChange={handleZoneNomChange} />
      <Button variant="contained" onClick={handleAddZone}>Add</Button>
    </Box>
  );
}
