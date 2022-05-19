import { Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AnyCnameRecord } from 'dns';
import firebaseConfig from '../firebase-setup/firebaseConfig';

interface Props {}

function RegisterPage({}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSignup = (event: any) => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!');
      })
      .catch((error: any) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Stack gap={2}>
        <Typography textAlign="center" variant="h4">
          Sign Up
        </Typography>
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
      </Stack>
    </Container>
  );
}

export default RegisterPage;
