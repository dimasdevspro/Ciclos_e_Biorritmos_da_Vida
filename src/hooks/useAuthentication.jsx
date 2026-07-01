import { app } from "../firebase/config";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

export default function useAuthentication() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // Logout
  function logout() {
    checkIfIsCancelled();
    signOut(auth);
  }

  // Login
  async function login(data) {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      setLoading(false);
      return user;
    } catch (err) {
      let systemErrorMessage;

      if (err.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (err.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  }

  // Reset Password
  async function resetPassword(email) {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Erro ao enviar e-mail de redefinição de senha.");
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [auth]);
  return { auth, error, loading, logout, login, resetPassword };
}
