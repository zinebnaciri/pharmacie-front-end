
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container, Box, Grid, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import UploadImage from './Image';
import PharmacyForm from './PharmacieForm';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function CrudPharmacy() {
    //MODAL CONSTS
    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => setOpen1(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openD, setOpenD] = React.useState(false);
    const handleClickOpenDelete = () => {
        setOpenD(true);
    };

    const handleCloseDelete = () => {
        setOpenD(false);
    };
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  

    //FETCHING DATA IN TABLES FUNCTION
    const [pharmacies, setPharmacies] = useState([]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    useEffect(() => {
        // Fetch data for villes and zones from Spring API using Axios
        axios
            .all([
                axios.get('/api/pharmacie/all')
            ])
            .then(axios.spread((pharmaciesResponse) => {
                setPharmacies(pharmaciesResponse.data);
               
            }))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Container sx={{ marginTop: '20px' }}>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item lg={12} xs={10}>
                <PharmacyForm />
                </Grid>
                    <Grid item lg={12} xs={10}>
                        <Item sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'lightgreen' }}>
                            <Typography sx={{ marginRight: 'auto', color: 'white' }}>Liste des Pharmacies</Typography>
                            
                            {/*
                            <Button sx={{ color: 'white', border: 1, borderRadius: '5px' }} onClick={handleOpen1}>
                                <AddCircleOutlineIcon sx={{ marginRight: '5px' }} /> Add new
                            </Button>
                            <Modal
                                open={open1}
                                onClose={handleClose1}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <PharmacyForm />
                                    </Typography>

                                </Box>
                            </Modal> 
                            */}
                        </Item>
                        <Box sx={{ margin: '16px 0' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'lightgrey' }}>
                                            <TableCell sx={{ py: 0, lineHeight: '30px' }}>ID</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '30px' }}>Nom</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '30px' }}>Adress</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '30px' }}>Latitude</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '30px' }}>Longitude</TableCell>
                                            
                                            <TableCell sx={{ py: 0, lineHeight: '30px' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pharmacies.map((pharmacy) => (
                                            <TableRow key={pharmacy.id}>
                                                <TableCell>{pharmacy.id}</TableCell>
                                                <TableCell>{pharmacy.nom}</TableCell>
                                                <TableCell>{pharmacy.adress}</TableCell>
                                                <TableCell>{pharmacy.latitude}</TableCell>
                                                <TableCell>{pharmacy.longitude}</TableCell>
                                                { /*
                                                <TableCell>
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton  onClick={handleClickOpenDelete}>
                                                        <DeleteIcon>
                                                           
                                                            <Dialog
                                                            fullScreen={fullScreen}
                                                                open={openD}
                                                                onClose={handleCloseDelete}
                                                                aria-labelledby="responsive-dialog-title"
                                                            >
                                                                <DialogTitle id="responsive-dialog-title">
                                                                    {"Are you sure you want to delete this city?"}
                                                                </DialogTitle>

                                                                <DialogActions>
                                                                    <Button autoFocus onClick={handleCloseDelete}>
                                                                        yes
                                                                    </Button>
                                                                    <Button onClick={handleCloseDelete} autoFocus>
                                                                        cancek
                                                                    </Button>
                                                                </DialogActions>
                                                            </Dialog>
                                                        </DeleteIcon>
                                                    </IconButton>
                                                </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                    

                </Grid>
            </Box>
        </Container >



    );
}