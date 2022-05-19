import { Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { AnyCnameRecord } from 'dns';
import firebaseConfig from '../firebase-setup/firebaseConfig';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event: any) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: username,
        });
        window.location.href = '/list';
      })
      .catch((error: any) => {});
  };

  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <Container maxWidth="sm">
      <Stack gap={2}>
        <Typography textAlign="center" variant="h4">
          Sign Up
        </Typography>
        <TextField
          label="Display Name"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" onClick={handleSignup}>
          Sign Up
        </Button>
        <Button variant="contained" onClick={redirectToLogin}>
          Login
        </Button>
      </Stack>
    </Container>
  );
}

export default RegisterPage;
