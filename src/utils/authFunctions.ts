import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await sendEmailVerification(userCredential.user);
  await signOut(auth);
  alert(
    "Registration successful. A verification email has been sent to your email address. Please verify your email before logging in."
  );
};

export const signIn = async (
  email: string,
  password: string
): Promise<void> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (!userCredential.user.emailVerified) {
    await signOut(auth);
    alert(
      "Your email is not verified. Please check your inbox and verify your email before logging in."
    );
  }
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
};
