import * as React from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";



export default function CardPharm() {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
      fetch("/api/pharmacie/all")
        .then((response) => response.json())
        .then((data) => setPharmacies(data));
    }, []);
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {pharmacies.map((pharmacy) => (
            <Box sx={{margin:'20px'}}>
          <Card key={pharmacy.id} sx={{ maxWidth: 345,width:'300px' }}>
            <CardHeader
              title={pharmacy.nom}
              subheader={pharmacy.adress}
            />
            <CardMedia
              component="img"
            
              height="300"
              image={pharmacy.image}
              sx={{padding:2}}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {pharmacy["Textes complets"]}
              </Typography>
            </CardContent>
          </Card>
          </Box>
        ))}
      </div>
    );
  
}