import * as React from 'react';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';

const theme = createTheme();

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [object, setObject] = useState('');
    const [type, setType] = useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
        console.log("uyrduyrdyrd", event.target.value)
        if (event.target.value !== 'Autres') {
            setObject(event.target.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send email using EmailJS
        emailjs.sendForm('service_y3f7skl', 'template_ymsvgoh', event.target, 'Gt1zro3MNwPhLhNm7')
            .then((result) => {
                console.log(result.text);
    toast.success('Your message was sent successfully!');
                // Clear the form fields
                setObject('');
                setName('');
                setEmail('');
                setMessage('');

            }, (error) => {
                console.log(error.text);
                toast.error('An error occurred while sending the message.');
            });
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleObjectChange = (event) => {

        setObject(event.target.value);
    };


    return (
        <ThemeProvider theme={theme}>
            <ToastContainer/>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        bgcolor: 'white'

                    }}
                >
                    <Box sx={{ maxWidth: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{
                                color: 'primary.main',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                marginTop: 5,
                                fontSize: '2rem',
                                '@media (max-width: 768px)': {
                                    fontSize: '2.5rem',
                                    marginTop: 3
                                },
                                '@media (max-width: 480px)': {
                                    fontSize: '1rem',
                                    marginTop: 1
                                }
                            }}
                        >
                           Contact Support
                        </Typography>

                    </Box>


                    <Box component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1, bgcolor: 'white', p: 3 }}>

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <FormControlLabel value="Facing a system problem" control={<Radio />} label="Facing a system problem" />
                            <FormControlLabel value="System Maintenance" control={<Radio />} label="System Maintenance" />
                            <FormControlLabel value="Autres" control={<Radio />} label="Other" />

                        </RadioGroup>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="object"
                            label="Sujet"
                            name="object"
                            autoComplete="Sujet"
                            autoFocus
                            value={object}
                            onChange={handleObjectChange}
                            disabled={type !== 'Autres'}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nom"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="message"
                            label="Message"
                            name="message"
                            autoComplete="message"
                            autoFocus
                            multiline
                            value={message}
                            onChange={handleMessageChange}
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 1 }}
                        >
                            Send
                        </Button>
                       

                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}
