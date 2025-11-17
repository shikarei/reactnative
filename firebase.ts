import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7L4LgPXOSA14RRPizCYqDtobZWapn_HM",
    authDomain: "pgpbl-reactnative.firebaseapp.com",
    databaseURL: "https://pgpbl-reactnative-default-rtdb.firebaseio.com",
    projectId: "pgpbl-reactnative",
    storageBucket: "pgpbl-reactnative.firebasestorage.app",
    messagingSenderId: "516727037689",
    appId: "1:516727037689:web:86546c00d075d49c874c28",
    measurementId: "G-ZN4WQ8DYGN"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor instance database agar bisa digunakan di file lain
export const db = getDatabase(app);
