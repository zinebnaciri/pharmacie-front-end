import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const useStyles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: (theme) =>
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
    {'Copyright © '}

    Made by Zineb Naciri

    {new Date().getFullYear()}
    {'.'}
</Typography>
  );
}

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <CssBaseline />

      <Box
        component="footer"
        className={classes.footer}
        py={3}
        px={2}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            <Copyright />
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
