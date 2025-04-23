// app/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAmmwfljwtGX_QQogSpIOx-UxZL4OGzNO4",
  authDomain: "aisocialchameleonapp.firebaseapp.com",
  projectId: "aisocialchameleonapp",
  storageBucket: "aisocialchameleonapp.firebasestorage.app",
  messagingSenderId: "865885876119",
  appId: "1:865885876119:web:54710be501784f32d71ed2",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence
});

export const firestore = getFirestore(app);
export const storage = getStorage(app);
