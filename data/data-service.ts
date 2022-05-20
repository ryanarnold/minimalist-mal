import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-setup/firebaseConfig';
import { dummyAnime, dummyUserAnimeList } from './dummy-data';
import IAnime from './interfaces/IAnime';
import IUserAnimeList from './interfaces/IUserAnimeList';

const ANIME_COLLECTION = 'anime';
const ANIME_LIST_COLLECTION = 'anime_list';

export default function initDb() {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
}

export async function searchAnime(searchQuery: string) {
  const db = initDb();

  const animeCollection = collection(db, ANIME_COLLECTION);
  const q = query(
    animeCollection,
    where('title_en', '>=', searchQuery),
    where('title_en', '<=', `${searchQuery}\uf8ff`)
  );
  const querySnapshot = await getDocs(q);

  const searchResults: Array<IAnime> = [];

  querySnapshot.forEach((animeDoc) => {
    searchResults.push(animeDoc.data() as IAnime);
  });

  return searchResults;
}

export async function retrieveAnime(titleEnglish: string): Promise<IAnime | null> {
  const db = initDb();

  const animeCollection = collection(db, ANIME_COLLECTION);
  const q = query(animeCollection, where('title_en', '==', titleEnglish));
  const querySnapshot = await getDocs(q);

  let searchResult: IAnime | null = null;

  querySnapshot.forEach((animeDoc) => {
    searchResult = animeDoc.data() as IAnime;
  });

  return searchResult;
}

export async function populateAnime() {
  const db = initDb();

  dummyAnime.forEach(async (dummyAnimeData) => {
    try {
      await addDoc(collection(db, ANIME_COLLECTION), dummyAnimeData);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  });
}

export async function deleteAllAnime() {
  const db = initDb();

  const querySnapshot = await getDocs(collection(db, ANIME_COLLECTION));
  querySnapshot.forEach((animeDoc) => {
    deleteDoc(doc(db, ANIME_COLLECTION, animeDoc.id));
  });
}

export async function createUserAnimeList(
  userAnimeList: IUserAnimeList
): Promise<IUserAnimeList | null> {
  const db = initDb();

  try {
    const animeListData = { ...userAnimeList };

    const animeRef = doc(db, ANIME_COLLECTION, animeListData.anime);
    animeListData.anime = animeRef;

    const createdDoc = await addDoc(collection(db, ANIME_LIST_COLLECTION), animeListData);

    return (await getDoc(createdDoc)).data() as IUserAnimeList;
  } catch (e) {
    console.error('Error adding document: ', e);
  }

  return null;
}

export async function retrieveUserAnimeList(
  anime: string,
  uid: string
): Promise<IUserAnimeList | null> {
  const db = initDb();

  const animeDoc = doc(db, ANIME_COLLECTION, anime);

  if (animeDoc === null) {
    return null;
  }

  console.log(animeDoc.id);

  const userAnimeListCollection = collection(db, ANIME_LIST_COLLECTION);
  const q = query(
    userAnimeListCollection,
    where(ANIME_COLLECTION, '==', animeDoc),
    where('uid', '==', uid)
  );
  const querySnapshot = await getDocs(q);

  let searchResult: IUserAnimeList | null = null;

  querySnapshot.forEach((result) => {
    searchResult = result.data() as IUserAnimeList;
  });

  return searchResult;
}

export async function retrieveUserAnimeListAll(uid: string) {
  const db = initDb();

  const userAnimeListCollection = collection(db, ANIME_LIST_COLLECTION);
  const q = query(userAnimeListCollection, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  const searchResults: Array<IUserAnimeList> | any = [];

  querySnapshot.forEach((result) => {
    searchResults.push(result.data() as IUserAnimeList);
  });

  return searchResults;
}

export async function updateUserAnimeList(anime: string, uid: string, newData: any): Promise<void> {
  const db = initDb();

  const animeDoc = doc(db, ANIME_COLLECTION, anime);

  if (animeDoc === null) {
    return;
  }

  const userAnimeListCollection = collection(db, ANIME_LIST_COLLECTION);
  const q = query(
    userAnimeListCollection,
    where(ANIME_COLLECTION, '==', animeDoc),
    where('uid', '==', uid)
  );
  const querySnapshot = await getDocs(q);

  let searchResultId: string = '';

  querySnapshot.forEach((result) => {
    searchResultId = result.id;
  });

  console.log(searchResultId);

  const userAnimeListDoc = doc(db, ANIME_LIST_COLLECTION, searchResultId);
  console.log(userAnimeListDoc.id);
  await updateDoc(userAnimeListDoc, newData);
}

export async function deleteUserAnimeList(anime: string, uid: string) {
  return {};
}

export async function populateUserAnimeList() {
  const db = initDb();

  dummyUserAnimeList.forEach(async (data: any) => {
    try {
      const animeListData = { ...data };

      const animeDoc = doc(db, ANIME_COLLECTION, animeListData.anime);
      animeListData.anime = animeDoc;

      await addDoc(collection(db, ANIME_LIST_COLLECTION), animeListData);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  });
}

export async function deleteAllUserAnimeList() {
  const db = initDb();

  const querySnapshot = await getDocs(collection(db, ANIME_LIST_COLLECTION));
  querySnapshot.forEach((userAnimeListDoc) => {
    deleteDoc(doc(db, ANIME_LIST_COLLECTION, userAnimeListDoc.id));
  });
}
