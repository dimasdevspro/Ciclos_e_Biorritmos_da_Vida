import useAuthentication from "../hooks/useAuthentication";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, error: authError, loading } = useAuthentication();

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = await login({ email, password });
    if (user) {
      navigate("/dashboard");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-[300px] max-w-full mx-auto rounded-xl bg-blue-50 p-4 shadow-md">
      <h1 className="text-2xl font-bold mb-2">Entrar</h1>
      <p className="text-sm">Acesso à administração e conteúdo restrito.</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {error && <div className="mb-3 text-sm text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600 disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
