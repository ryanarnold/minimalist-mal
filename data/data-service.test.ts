import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import {
  createUserAnimeList,
  deleteAllAnime,
  deleteAllUserAnimeList,
  deleteUserAnimeList,
  populateAnime,
  populateUserAnimeList,
  retrieveAnime,
  retrieveUserAnimeList,
  retrieveUserAnimeListAll,
  searchAnime,
  updateUserAnimeList,
} from './data-service';
import IAnime from './interfaces/IAnime';
import IUserAnimeList from './interfaces/IUserAnimeList';

async function populateData() {
  await populateAnime();
  await populateUserAnimeList();
}

async function deleteData() {
  await deleteAllUserAnimeList();
  await deleteAllAnime();
}

beforeAll(async () => populateData());

afterAll(async () => deleteData());

test('Anime: Search', async () => {
  const searchResults = await searchAnime('Clannad');
  expect(searchResults).toHaveLength(2);
  expect(searchResults[0].title_en).toBe('Clannad');
  expect(searchResults[1].title_en).toBe('Clannad: After Story');
});

test('Anime: Retrieve', async () => {
  const anime = await retrieveAnime('Baccano!');
  expect(anime?.title_en).toBe('Baccano!');
});

test('Anime: Retrieve (non-existent)', async () => {
  const anime = await retrieveAnime('Attack on Titan');
  expect(anime).toBeNull();
});

test('User Anime List: Create', async () => {
  const newUserAnime = {
    anime: 'Clannad',
    episodes_watched: 5,
    rating: 5,
    status: 'complete',
    uid: 'sjH4tibVodWlKDt6lXCF06FXLWE2',
  };

  const createdRecord = (await createUserAnimeList(newUserAnime)) as IUserAnimeList;
  expect(createdRecord).not.toBeNull();
  expect(createdRecord.uid).toBe('sjH4tibVodWlKDt6lXCF06FXLWE2');
  expect(createdRecord.status).toBe('complete');
});

test('User Anime List: Retrieve', async () => {
  const retrievedRecord = (await retrieveUserAnimeList(
    'Baccano!',
    'sjH4tibVodWlKDt6lXCF06FXLWE2'
  )) as IUserAnimeList;
  expect(retrievedRecord.uid).toBe('sjH4tibVodWlKDt6lXCF06FXLWE2');
  expect(retrievedRecord.status).toBe('complete');
});

test('User Anime List: Retrieve All For User', async () => {
  const retrievedRecords = (await retrieveUserAnimeListAll(
    'sjH4tibVodWlKDt6lXCF06FXLWE2'
  )) as Array<IUserAnimeList>;
  expect(retrievedRecords).toHaveLength(2);
});

test('User Anime List: Update', async () => {
  const newData = {
    anime: 'Clannad',
    episodes_watched: 6,
    rating: 10,
    status: 'watching',
    uid: 'sjH4tibVodWlKDt6lXCF06FXLWE2',
  };

  await updateUserAnimeList(newData.anime, newData.uid, newData);

  const updatedRecord = await retrieveUserAnimeList(newData.anime, newData.uid);

  expect(updatedRecord?.uid).toBe('sjH4tibVodWlKDt6lXCF06FXLWE2');
  expect(updatedRecord?.episodes_watched).toBe(6);
  expect(updatedRecord?.rating).toBe(10);
});

// test('User Anime List: Delete', async () => {
//   await deleteUserAnimeList('Clannad', 'sjH4tibVodWlKDt6lXCF06FXLWE2');

//   const deletedRecord = await retrieveUserAnimeList('Clannad', 'sjH4tibVodWlKDt6lXCF06FXLWE2');
//   expect(deletedRecord).toBeNull();
// });

export {};
