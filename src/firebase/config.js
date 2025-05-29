import { initializeApp } from "firebase/app"; // Metodo para inicializar la app de firebase
import { getFirestore } from "firebase/firestore"; // Metodos de firestore de una app de firebase
import { getAuth } from "firebase/auth"; //Metodos de auth de una app de firebase

// Variables de entorno para la configuracion de firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig); // Inicializa la app de firebase con la configuracion
const db = getFirestore(app); // Inicializa firestore database
const auth = getAuth(app); // Inicializa los servicios auth

export { db, auth }; // Exporta para uso en otros archivos