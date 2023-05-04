import * as React from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";



export default function CardPharm({ selectedCity }) {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
      fetch("/api/pharmacie/all")
        .then((response) => response.json())
        .then((data) => setPharmacies(data));
    }, []);
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {pharmacies
        .filter((pharmacy) => !selectedCity || pharmacy.adress.includes(selectedCity.name))
        .map((pharmacy) => (
          <Box sx={{ margin: '20px', width: '100%', maxWidth: '500px' }}>
            <Card sx={{ width: '100%', border: 1, padding: 2 }}>
              <CardHeader title={pharmacy.nom} subheader={pharmacy.adress}  />
              <CardMedia component="img" height="250" image={pharmacy.image} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {pharmacy['Textes complets']}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
    </div>
    
    );
  
}