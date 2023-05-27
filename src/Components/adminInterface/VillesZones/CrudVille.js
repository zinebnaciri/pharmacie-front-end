import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Container, Box, Grid, Typography, Button, DialogContent, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VilleForm from './VilleForm';
import ZoneForm from './ZoneForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
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


export default function Crud() {
    //MODAL CONSTS

    const [open1, setOpen1] = React.useState(false);
    const handleOpen1 = () => setOpen1(true);
    const handleClose1 = () => {
        setOpen1(false);
        setRefreshTables(true);
    };
    const [selectedItem, setSelectedItem] = useState(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); setRefreshTables(true); }
    const [refreshTables, setRefreshTables] = useState(false);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [editedZoneName, setEditedZoneName] = useState('');

    const handleOpenDeleteDialog = (item) => {
        setSelectedItem(item);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };


    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);
    useEffect(() => {
        
        axios
            .all([
                axios.get('/api/ville/all'),
                axios.get('/api/zone/all')
            ])
            .then(axios.spread((villesResponse, zonesResponse) => {
                setVilles(villesResponse.data);
                setZones(zonesResponse.data);
                setRefreshTables(false);
            }))
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [refreshTables]);
    const handleDeleteZone = () => {
        if (selectedItem && selectedItem.type === 'zone') {
            axios
                .delete(`/api/zone/delete/${selectedItem.id}`)
                .then(() => {
                    setRefreshTables(true);
                    setSelectedItem(null);
                    setOpenDeleteDialog(false);
                    toast.success('Zone deleted successfully');
                })
                .catch(error => {
                    toast.error('One or more pharmacies exist in this zone you can not delete it');
                });
        }
    };

    const handleDeleteVille = () => {
        if (selectedItem && selectedItem.type === 'ville') {
            axios
                .delete(`/api/ville/delete/${selectedItem.id}`)
                .then(() => {
                    setRefreshTables(true);
                    setSelectedItem(null);
                    setOpenDeleteDialog(false);
                    toast.success('City deleted successfully');
                })
                .catch(error => {
                    toast.error('One or more pharmacies exist in one of this city zones you can not delete it');
                });
        }
    };


    const handleOpenEditModalZ = (zone) => {
        setSelectedZone(zone);
        setEditedZoneName(zone.nom);
        setEditModalOpen(true);
    };

    const handleEditZoneName = () => {
        axios
            .put(`/api/zone/update/${selectedZone.id}`, { nom: editedZoneName })
            .then(() => {
                setRefreshTables(true);
                setEditModalOpen(false);
                toast.success('Zone name updated successfully!', 'Success');
            })
            .catch((error) => {
                console.error('Error updating zone name:', error);
                toast.error('Failed to update zone name', 'Error');
            });
    };


    return (
        <Container sx={{ marginTop: '20px' }}>
            <ToastContainer />
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                    <Grid item xs={6}>
                        <Item sx={{ display: 'flex', alignItems: 'center', bgcolor: 'black' }}>
                            <Typography sx={{ marginRight: 'auto', color: 'white' }}>Cities List : </Typography>
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
                                        <VilleForm />
                                    </Typography>

                                </Box>
                            </Modal>
                        </Item>
                        <Box sx={{ margin: '16px 0' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'grey' }}>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>ID</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>Name</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {villes.map((ville) => (
                                            <TableRow key={ville.id}>
                                                <TableCell>{ville.id}</TableCell>
                                                <TableCell>{ville.nom}</TableCell>
                                                <TableCell>

                                                    <IconButton
                                                        color="error"
                                                        aria-label="delete"
                                                        onClick={() => handleOpenDeleteDialog({ type: 'ville', id: ville.id })}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>

                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                    <Grid item xs={6}>
                        <Item sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'black' }}>
                            <Typography sx={{ marginRight: 'auto', color: 'white' }}>Zones List : </Typography>
                            <Button sx={{ color: 'white', border: 1, borderRadius: '5px' }} onClick={handleOpen}>
                                <AddCircleOutlineIcon sx={{ marginRight: '5px' }} /> Add new
                            </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <ZoneForm />
                                    </Typography>

                                </Box>
                            </Modal>
                        </Item>
                        <Box sx={{ margin: '16px 0' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'grey' }}>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>ID</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>City</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>Zone Name</TableCell>
                                            <TableCell sx={{ py: 0, lineHeight: '40px', color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {zones.map((zone) => {
                                            console.log(zone); // Add this line to check the data being mapped
                                            return (
                                                <TableRow key={zone.id}>
                                                    <TableCell>{zone.id}</TableCell>
                                                    <TableCell>{zone.ville ? zone.ville.nom : ''}</TableCell>
                                                    <TableCell>{zone.nom}</TableCell>
                                                    
                                                    <TableCell>
                                                        <IconButton color="primary.main" onClick={() => handleOpenEditModalZ(zone)}>
                                                            <EditIcon />
                                                        </IconButton >
                                                        <IconButton
                                                            color="error"
                                                            aria-label="delete"
                                                            onClick={() => handleOpenDeleteDialog({ type: 'zone', id: zone.id })}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>

                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
          
                <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} sx={style}>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>Are you sure  you want to delete this record ?</DialogContent>
                    <DialogActions style={{ backgroundColor: 'black' }}>
                        <Button sx={{color:'white'}} onClick={handleCloseDeleteDialog}>Cancel</Button>
                        {selectedItem && selectedItem.type === 'ville' && (
                            <Button sx={{color:'white'}} onClick={handleDeleteVille} autoFocus>
                                Delete City
                            </Button>
                        )}
                        {selectedItem && selectedItem.type === 'zone' && (
                            <Button sx={{color:'white'}} onClick={handleDeleteZone} autoFocus>
                                Delete Zone
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
        
            <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
 
  <DialogContent>
    <TextField
      id="edit-zone-name"
      label="Zone Name"
      variant="outlined"
      fullWidth
      value={editedZoneName}
      onChange={(e) => setEditedZoneName(e.target.value)}
    />
  </DialogContent>
  <DialogActions style={{ backgroundColor: 'black' }}>
    <Button sx={{color:'white'}} onClick={() => setEditModalOpen(false)}>Cancel</Button>
    <Button sx={{color:'white'}} onClick={handleEditZoneName} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>



        </Container >



    );
}