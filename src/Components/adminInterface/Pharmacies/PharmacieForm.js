import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Autocomplete from '@mui/material/Autocomplete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function PharmacyForm() {


  const [file, setFile] = useState(null);

  const [pharmacyInfo, setPharmacyInfo] = useState({
    nom: '',
    latitude: '',
    longitude: '',
    adress: '',
    image: null,
    zone: null, // Add the zone property
  });
  const [zones, setZones] = useState([]);
  useEffect(() => {
    // Fetch all zones from the API using Axios
    axios
      .get('/api/zone/all')
      .then(response => {
        setZones(response.data);
      })
      .catch(error => {
        toast.error('Error fetching zones:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPharmacyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleZoneChange = (event, newValue) => {
    setPharmacyInfo((prevInfo) => ({
      ...prevInfo,
      zone: newValue,
    }));
  };
  const handleAddPharmacy = () => {
    if (
      !pharmacyInfo.nom ||
      !pharmacyInfo.latitude ||
      !pharmacyInfo.longitude ||
      !pharmacyInfo.adress ||
      !pharmacyInfo.zone
    ) {
      // Display an error message or handle the missing fields case
      toast.warning('Please fill in all the required fields');
      return;
    }
  
    const updatedPharmacyInfo = {
      ...pharmacyInfo,
      image: file, // Use the file variable here
    };
  
    // Send a POST request to the API '/api/pharmacies/save' with the updatedPharmacyInfo values
    console.log(updatedPharmacyInfo);
    console.log(file);
    axios
      .post('/api/pharmacie/save', updatedPharmacyInfo)
      .then((response) => {
        // Handle the successful response here
        toast.success('Pharmacy added successfully:', response.data);
        // Reset the form fields
        setPharmacyInfo({
          nom: '',
          latitude: '',
          longitude: '',
          adress: '',
          image: '',
          zone: '',
        });
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        toast.error('Error adding pharmacy:', error);
      });
  };
  
  const handleAddPharmacyClick = () => {
    handleAddPharmacy(pharmacyInfo);
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
      <ToastContainer position="top-right" />
      <TextField
        id="outlined-nom"
        name="nom"
        label="Nom"
        variant="outlined"
        value={pharmacyInfo.nom}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="outlined-latitude"
        name="latitude"
        label="Latitude"
        variant="outlined"
        value={pharmacyInfo.latitude}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="outlined-longitude"
        name="longitude"
        label="Longitude"
        variant="outlined"
        value={pharmacyInfo.longitude}
        onChange={handleInputChange}
        required
      />
      <TextField
        id="outlined-address"
        name="adress"
        label="Address"
        variant="outlined"
        value={pharmacyInfo.adress}
        onChange={handleInputChange}
        required
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
      <Autocomplete
        id="zone-autocomplete"
        options={zones}
        getOptionLabel={(option) => option.nom} // Use the "nom" property as the label value
        value={pharmacyInfo.zone}
        onChange={handleZoneChange}
        renderInput={(params) => <TextField {...params} label="Zone" />}
        required
      />

      <Button variant="contained" onClick={handleAddPharmacyClick}>
        Add
      </Button>
    </Box>
  );
}
