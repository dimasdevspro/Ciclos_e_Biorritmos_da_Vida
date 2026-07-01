import accountIcon from "../assets/account-icon.svg";
import { useState } from "react";
import Login from "../pages/Login";
import useAuthentication from "../hooks/useAuthentication";
import { useAuthValue } from "../contexts/AuthContext";

export default function MenuAccountBlog() {
  const [formLogin, setFormLogin] = useState(false);
  const { logout } = useAuthentication();
  const { user } = useAuthValue();

  return (
    <>
      {!user && (
        <span className="relative inline-block bg-blue-200 p-1">
          <button
            type="button"
            onClick={() => setFormLogin((prev) => !prev)}
            className="flex items-center rounded-full p-1 hover:bg-blue-300"
            aria-label="Abrir menu da conta"
          >
            <img
              src={accountIcon}
              alt="Ícone da conta"
              className="h-6 w-6 cursor-pointer"
            />
          </button>

          {formLogin && (
            <div className="absolute right-0 top-full z-50 mt-2">
              <Login />
            </div>
          )}
        </span>
      )}
      {user && (
        <span className="relative inline-block bg-blue-200 p-1">
          <button
            type="button"
            onClick={() => setFormLogin((prev) => !prev)}
            className="flex items-center rounded-full p-1 hover:bg-blue-300"
            aria-label="Abrir menu da conta"
          >
            <img
              src={accountIcon}
              alt="Ícone da conta"
              className="h-6 w-6 cursor-pointer"
            />
          </button>

          {formLogin && (
            <div className="absolute right-0 top-full z-50 mt-2">
              <button
                type="button"
                onClick={logout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          )}
        </span>
      )}
    </>
  );
}
