
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';


export default function VilleForm() {
  const [villeNom, setVilleNom] = useState('');

  const handleVilleNomChange = (event) => {
    setVilleNom(event.target.value);
  };

  const handleAddVille = () => {

    axios
      .post('/api/ville/save', { nom: villeNom })
      .then((response) => {
        // Handle the successful response here
        console.log('Ville added successfully:', response.data);
        // Reset the form field
        setVilleNom('');

      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error adding ville:', error);
      });
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
      <TextField id="outlined-basic" label="Nom" variant="outlined" value={villeNom} onChange={handleVilleNomChange} />
      <Button variant="contained" onClick={handleAddVille}>Add</Button>
    </Box>

  );
}