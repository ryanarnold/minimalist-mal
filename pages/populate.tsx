import { Button } from '@mui/material';
import React from 'react';
import { deleteAllAnime, populateDummyData } from '../data/data-service';

function PopulatePage() {
  // populateDummyData();

  return (
    <div>
      <div>This page populates the firestore database with dummy data.</div>
      <Button variant="contained" onClick={populateDummyData}>
        Populate
      </Button>
      <Button variant="contained" onClick={deleteAllAnime}>
        Delete All
      </Button>
    </div>
  );
}

export default PopulatePage;
