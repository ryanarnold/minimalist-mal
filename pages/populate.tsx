import { Button } from '@mui/material';
import React from 'react';
import {
  deleteAllAnime,
  deleteAllUserAnimeList,
  populateAnime,
  populateUserAnimeList,
} from '../data/data-service';

function PopulatePage() {
  return (
    <div>
      <div>This page populates the firestore database with dummy data.</div>
      <div>
        <h1>Anime</h1>
        <Button variant="contained" onClick={populateAnime}>
          Populate
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={deleteAllAnime}>
          Delete All
        </Button>
      </div>
      <div>
        <h1>User Anime List</h1>
        <Button variant="contained" onClick={populateUserAnimeList}>
          Populate
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={deleteAllUserAnimeList}>
          Delete All
        </Button>
      </div>
    </div>
  );
}

export default PopulatePage;
