import { initializeApp } from "firebase/app"; // Metodo para inicializar la app de firebase
import { getFirestore } from "firebase/firestore"; // Metodos de firestore de una app de firebase
import { getAuth } from "firebase/auth"; //Metodos de auth de una app de firebase

// Variables de entorno para la configuracion de firebase
const firebaseConfig = {
  apiKey: "AIzaSyACr87suR28B20ZkC6teNpp1pHS2NQje6g",
  authDomain: "atlantis-fa2ad.firebaseapp.com",
  projectId: "atlantis-fa2ad",
  storageBucket: "atlantis-fa2ad.firebasestorage.app",
  messagingSenderId: "762393508432",
  appId: "1:762393508432:web:a3a7ec4f5a1f675c2c2f55"
};

const app = initializeApp(firebaseConfig); // Inicializa la app de firebase con la configuracion
const db = getFirestore(app); // Inicializa firestore database
const auth = getAuth(app); // Inicializa los servicios auth

export { db, auth }; // Exporta para uso en otros archivos