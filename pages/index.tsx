/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import Button from '@mui/material/Button';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <div>
    <h1>Hello</h1>
    <Button variant="contained" href="/signup">
      Start Tracking
    </Button>
    <Button variant="contained" href="/login">
      Login
    </Button>
  </div>
);

export default Home;
