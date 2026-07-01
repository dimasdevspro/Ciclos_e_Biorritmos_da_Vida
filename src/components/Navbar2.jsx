import { Link } from "react-router-dom";
import MenuAccountBlog from "./MenuAccountBlog";
import { useAuthValue } from "../contexts/AuthContext";

export default function Navbar2() {
  const { user } = useAuthValue();
  return (
    <>
      {/* MOBILE (abaixo de 640px) */}
      <header className="block sm:hidden bg-blue-200 p-4">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-center font-bold text-1xl">Blog</h2>
        </div>
        <nav className="mt-3 flex justify-center gap-4 text-lg">
          {user && (
            <>
              <Link to="/create-post" className="hover:text-blue-500">
                Novo Post
              </Link>
              <Link to="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            </>
          )}
          <MenuAccountBlog />
        </nav>
      </header>

      {/* DESKTOP (acima de 640px) */}
      <header className="hidden sm:flex justify-between items-center bg-blue-200 py-4 px-8">
        <h2 className="font-bold text-2xl">Blog</h2>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6 text-xl">
            {user && (
              <>
                <Link to="/create-post" className="hover:text-blue-500">
                  Novo Post
                </Link>
                <Link to="/dashboard" className="hover:text-blue-500">
                  Dashboard
                </Link>
              </>
            )}
            <MenuAccountBlog />
          </nav>
        </div>
      </header>
    </>
  );
}
