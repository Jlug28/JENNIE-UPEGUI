import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

// Flags & In-memory token storage (Do NOT store in localStorage per security rule)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

type TokenListener = (token: string | null, user: User | null) => void;
const tokenListeners = new Set<TokenListener>();

export const subscribeToAuthToken = (listener: TokenListener) => {
  tokenListeners.add(listener);
  if (cachedAccessToken || auth.currentUser) {
    listener(cachedAccessToken, auth.currentUser);
  }
  return () => {
    tokenListeners.delete(listener);
  };
};

const notifyTokenListeners = (token: string | null, user: User | null) => {
  tokenListeners.forEach((fn) => {
    try {
      fn(token, user);
    } catch (e) {
      console.error('Error en listener de token:', e);
    }
  });
};

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
        notifyTokenListeners(cachedAccessToken, user);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
        notifyTokenListeners(null, user);
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
      notifyTokenListeners(null, null);
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    notifyTokenListeners(cachedAccessToken, result.user);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  notifyTokenListeners(token, auth.currentUser);
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  notifyTokenListeners(null, null);
};
