import { auth, db } from './config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, browserLocalPersistence, setPersistence, updateProfile } from 'firebase/auth'
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'

export const AuthService = {
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

  async isUsernameTaken(username) {
    try {
      const usersRef = collection(db, 'usuarios')
      const q = query(usersRef, where('nombre_completo', '==', this.capitalizeUsername(username)))
      const querySnapshot = await getDocs(q)
      return !querySnapshot.empty
    } catch (error) {
      console.error('Error checking username:', error)
      throw error
    }
  },

  async register({ email, password, userData }) {
    try {
      const capitalizedName = this.capitalizeUsername(userData.nombre)
      const isNameTaken = await this.isUsernameTaken(userData.nombre)
      if (isNameTaken) {
        return {
          success: false,
          error: 'Este nombre de usuario ya está en uso',
          code: 'name-already-in-use'
        }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await updateProfile(userCredential.user, {
        displayName: capitalizedName
      })

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

  async login({ email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence)
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

  async logout() {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return this.handleAuthError(error)
    }
  },

  onAuthStateChange(callback) {
    try {
      return onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userProfile = await this.getUserProfile(user.uid)
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

  async createUserProfile(userId, userData) {
    try {
      const profile = {
        nombre_completo: this.capitalizeUsername(userData.nombre),
        email: userData.email,
        fecha_registro: new Date().toISOString(),
        id_usuario: userId,
        // Agrega cualquier otro dato personalizado aquí
        ...userData
      }

      delete profile.nombre // eliminar el campo original si existe

      await setDoc(doc(db, 'Usuarios', userId), profile)

      return { success: true }
    } catch (error) {
      console.error('Error creating user profile:', error)
      throw error
    }
  },

  async getCurrentUser() {
    return auth.currentUser;
  },

  async getUserProfile(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'Usuarios', userId))
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error('Error obteniendo el perfil del usuario:', error)
      throw error
    }
  },

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
