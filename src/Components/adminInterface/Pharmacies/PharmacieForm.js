import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import axios from 'axios';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';


export default function PharmacyForm() {
  

  const [file, setFile] = useState(null);
  
 
  let ph={
    nom: '',
    latitude: '',
    longitude: '',
    adress: '',
    image: file,
  }
  const [pharmacyInfo, setPharmacyInfo] = useState(ph);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPharmacyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleAddPharmacy = () => {
    // Send a POST request to the API '/api/pharmacies/save' with the pharmacyInfo values
    console.log(pharmacyInfo);
    console.log(file);
    axios
      .post('/api/pharmacie/save', pharmacyInfo)
      .then((response) => {
        // Handle the successful response here
        console.log('Pharmacy added successfully:', response.data);
        // Reset the form fields
        setPharmacyInfo({
          nom: '',
          latitude: '',
          longitude: '',
          adress: '',
          image: '',
        });
        
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error adding pharmacy:', error);
      });
  };
  
  const handleSaveImage = (imageData) => {
    setPharmacyInfo((prevInfo) => ({
      ...prevInfo,
      image: imageData,
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '70ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-nom"
        name="nom"
        label="Nom"
        variant="outlined"
        value={pharmacyInfo.nom}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-latitude"
        name="latitude"
        label="Latitude"
        variant="outlined"
        value={pharmacyInfo.latitude}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-longitude"
        name="longitude"
        label="Longitude"
        variant="outlined"
        value={pharmacyInfo.longitude}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-address"
        name="adress"
        label="Address"
        variant="outlined"
        value={pharmacyInfo.adress}
        onChange={handleInputChange}
      />
      <ImgCrop rotationSlider>
      <Upload.Dragger
      name="image"
      id="image"
      maxCount={1}
      listType="picture"
      action="http://localhost:3000/Pharmacie"
      accept=".png,.PNG,.JPEG,.jpeg,.jpg"

      beforeUpload={(file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          console.log(dataUrl);
          setFile(dataUrl);
        };
        reader.readAsDataURL(file);
        return false;
      }}
      >
        <p className="ant-upload-text">Drag image here</p>

      </Upload.Dragger>
    </ImgCrop>
      <Button variant="contained" onClick={handleAddPharmacy}>
        Add
      </Button>
    </Box>
  );
}
