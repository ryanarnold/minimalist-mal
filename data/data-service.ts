import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-setup/firebaseConfig';
import dummyData from './dummy-data';
import IAnime from './interfaces/IAnime';

export default null;

export async function searchAnime(searchQuery: string) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const animeRef = collection(db, 'anime');
  const q = query(
    animeRef,
    where('title_en', '>=', searchQuery),
    where('title_en', '<=', `${searchQuery}\uf8ff`)
  );

  const querySnapshot = await getDocs(q);

  const searchResults: Array<IAnime> = [];

  querySnapshot.forEach((doc) => {
    searchResults.push(doc.data() as IAnime);
  });

  return searchResults;
}

export async function populateDummyData() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  dummyData.forEach(async (data) => {
    try {
      await setDoc(doc(db, 'anime', data.title_en), data);
      console.log('Document written with ID: ', data.title_en);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  });
}

export async function deleteAllAnime() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const querySnapshot = await getDocs(collection(db, 'anime'));
  querySnapshot.forEach((animeDoc) => {
    console.log(`Deleting ${animeDoc.id}`);
    deleteDoc(doc(db, 'anime', animeDoc.id));
  });
}
