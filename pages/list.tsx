import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import React, { useState } from 'react';
import firebaseConfig from '../firebase-setup/firebaseConfig';

function ListPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  initializeApp(firebaseConfig);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      setCurrentUser(user);
    } else {
      setLoggedIn(false);
      window.location.href = '/';
    }
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signedInJsx = (
    <Container>
      <p>Logged In </p>
      <p>Hi {currentUser ? currentUser.displayName : ''}</p>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );

  return (
    <div>
      <h1>List</h1>
      {currentUser ? signedInJsx : <p>Signed out</p>}
    </div>
  );
}

export default ListPage;
