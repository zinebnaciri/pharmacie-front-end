import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';

export default function CardPharm({ searchText, selectedZone }) {
  const [pharmacies, setPharmacies] = useState([]);
  const [zones, setZones] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  useEffect(() => {
    fetch("/api/pharmacie/all")
      .then((response) => response.json())
      .then((data) => setPharmacies(data));

    fetch("/api/zone/all")
      .then((response) => response.json())
      .then((data) => setZones(data));
  }, []);

  const getZoneName = (zoneId) => {
    const zone = zones.find((zone) => zone.id === zoneId);
    return zone ? zone.nom : "";
  };

  const handleMapButtonClick = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const CustomModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const ModalContent = styled(Box)`
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 16px;
    outline: none;
    border-radius: 4px;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
  `;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
      {pharmacies
        .filter((pharmacy) => {
          // Filter by selected zone
          if (selectedZone && selectedZone.name !== "") {
            return getZoneName(pharmacy.zone.id) === selectedZone.name;
          }
          return true;
        })
        .filter((pharmacy) => {
          // Filter by search text
          if (searchText && searchText.trim() !== "") {
            return pharmacy.nom.toLowerCase().includes(searchText.toLowerCase());
          }
          return true;
        })
        .map((pharmacy) => (
          <Box sx={{ margin: '20px', width: '100%', maxWidth: '500px' }} key={pharmacy.id}>
            <Card sx={{ width: '100%', border: 1, padding: 2 }}>
              <CardHeader title={pharmacy.nom} />
              <Typography variant="body2" color="text.secondary" sx={{ margin: '10px' }}>
                Address: {pharmacy.adress}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ margin: '10px' }}>
                Located in: {getZoneName(pharmacy.zone.id)}
              </Typography>
              <CardMedia component="img" height="250" image={pharmacy.image} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {pharmacy['Textes complets']}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <Button variant="contained" color="primary" onClick={() => handleMapButtonClick(pharmacy)}>
                    MAP
                  </Button>
                </Box>
              </CardContent>
            </Card>
            <CustomModal open={selectedPharmacy !== null} onClose={() => setSelectedPharmacy(null)}>
              <ModalContent>
                {selectedPharmacy && (
                  <div>
                    <h2>Map of {selectedPharmacy.nom}</h2>
                  
                    <iframe
                      title="Google Maps"
                      width="100%"
                      height="400"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://maps.google.com/maps?q=${selectedPharmacy.latitude},${selectedPharmacy.longitude}&hl=es;&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </ModalContent>
            </CustomModal>
          </Box>
        ))}
    </div>
  );
}
