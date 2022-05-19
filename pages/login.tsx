import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase-setup/firebaseConfig';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(true);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setLoginSuccess(true);
        updateProfile(userCredentials.user, {
          displayName: 'foxygrandpa',
        });
        window.location.href = '/list';
      })
      .catch(() => {
        setLoginSuccess(false);
      });
  };

  const handlePressEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack gap={2}>
        <Typography textAlign="center" variant="h4">
          Signin
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
          onKeyDown={handlePressEnter}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handlePressEnter}
        />
        {!loginSuccess && (
          <Typography color="red">
            Login failed. Check that your email and password is correct.
          </Typography>
        )}
        <Button variant="contained" onClick={handleLogin}>
          Sign In
        </Button>
      </Stack>
    </Container>
  );
}

export default LoginPage;
