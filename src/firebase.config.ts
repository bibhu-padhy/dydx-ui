import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBQDRE3kHB1INm_L2TYyflbDCsBwD_3_24",
  authDomain: "traders-journal-007.firebaseapp.com",
  projectId: "traders-journal-007",
  storageBucket: "traders-journal-007.appspot.com",
  messagingSenderId: "711943818853",
  appId: "1:711943818853:web:9c0430a00e1c18591a408c",
  measurementId: "G-08EWRF7SBB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const convertFirestoreData = (data: any) => {
  const result: any = {};
  Object.keys(data).forEach(key => {
    if (data[key] instanceof Timestamp) {
      result[key] = data[key].toDate().toISOString();
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      result[key] = convertFirestoreData(data[key]);
    } else {
      result[key] = data[key];
    }
  });
  return result;
};