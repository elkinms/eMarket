// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // ⬅️ добавили

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB5NDbJgJfK_GIZA9lvgGv-ZMJjlD43ZvA",
    authDomain: "emarketems.firebaseapp.com",
    projectId: "emarketems",
    storageBucket: "emarketems.appspot.com", // ⬅️ ОБРАТИ ВНИМАНИЕ: исправил `.app` на `.com`
    messagingSenderId: "419721988583",
    appId: "1:419721988583:web:67c33f98588ab1631fd542"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт базы и хранилища
export const db = getFirestore(app);
export const storage = getStorage(app); // ⬅️ экспорт Storage
