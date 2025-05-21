import { auth, db } from './config' //llamamos la autentificacion y la base de datos
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, browserLocalPersistence,setPersistence, updateProfile  } from 'firebase/auth'//trae las funciones propias de firebase
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'

export const AuthService = {
  // Función auxiliar para capitalizar el nombre 
  //capitalizar poner la primera letra en mayuscula y el resto en minuscula
  capitalizeUsername(username) {
    if (!username || username.trim().length === 0) {
      throw new Error("El nombre de usuario no puede estar vacío.");
    }
    const cleanUsername = username.trim().replace(/\s+/g, ' ');
    return cleanUsername
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  },

  // Verificar si el nombre de usuario ya existe
  async isUsernameTaken(username) {
    try {
      const usersRef = collection(db, 'jugadores')
      const q = query(usersRef, where('nombre', '==', this.capitalizeUsername(username)))
      const querySnapshot = await getDocs(q)
      return !querySnapshot.empty
    } catch (error) {
      console.error('Error checking username:', error)
      throw error
    }
  },

  // Registro de usuario solo sirve para registrar
  async register({ email, password, userData }) {
    try {
      // Capitalizamos el nombre antes de verificar
      const capitalizedName = this.capitalizeUsername(userData.nombre)
      
      // Verificamos si el nombre ya existe
      const isNameTaken = await this.isUsernameTaken(userData.nombre)
      if (isNameTaken) {
        return {
          success: false,
          error: 'Este nombre de usuario ya está en uso',
          code: 'name-already-in-use'
        }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      //Agregar el nombre al perfil del usuario
      await updateProfile(userCredential.user, {
        displayName: capitalizedName
      })  
      // Guardamos el perfil del usuario en una coleccion de Firestore
      await this.createUserProfile(userCredential.user.uid, { 
        ...userData,
        nombre: capitalizedName,
        email 
      })

      return {
        user: userCredential.user,
        success: true
      }
    } catch (error) {
      return this.handleAuthError(error)
    }
  },

  // Login de usuario
  async login({ email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence); // Mantener la sesión en el navegador
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const userProfile = await this.getUserProfile(userCredential.user.uid)
      return {
        user: userCredential.user,
        profile: userProfile,
        success: true
      }
    } catch (error) {
      return this.handleAuthError(error)
    }
  },

  // Cerrar sesión
  async logout() {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return this.handleAuthError(error)
    }
  },

  // Mantener la sesión del usuario
  onAuthStateChange(callback) {
    try {
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userProfile = await this.getUserProfile(user.uid)
          // Si el usuario tiene un perfil, lo pasamos al callback
          callback({ user, profile: userProfile, loggedIn: true })
        } else {
          callback({ user: null, profile: null, loggedIn: false })
        }
      })
    } catch (error) {
      console.error('Error en el observador de estado de autenticación:', error)
      throw error
    }
  },

  // Crear perfil de usuario en Firestore
  async createUserProfile(userId, userData) {
    try {
      await setDoc(doc(db, 'jugadores', userId), {
        ...userData,
        // createdAt: new Date().toISOString()
      })
      return { success: true }
    } catch (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  },

  // Devuelve el usuario actual si está autenticado
  async getCurrentUser() {
    return auth.currentUser;
  },

  // Obtener perfil de usuario
  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'jugadores', userId))
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error('Error obteniendo el perfil del usuario:', error)
      throw error
    }
  },

  // Manejador de errores de autenticación
  handleAuthError(error) {
    const errorMessages = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'Correo electrónico inválido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'name-already-in-use': 'El nombre de usuario ya fue registrado por otro jugador',
      'auth/invalid-credential': 'Credenciales inválidas, el correo o la contraseña son incorrectos',
      'auth/user-disabled': 'Usuario deshabilitado',
    }

    return {
      success: false,
      error: errorMessages[error.code] || 'Error en la autenticación',
      code: error.code
    }
  }
}