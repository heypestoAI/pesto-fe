import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (
  email: string,
  password: string
): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
};
