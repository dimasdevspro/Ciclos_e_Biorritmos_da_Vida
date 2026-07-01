import Navbar2 from "../components/Navbar2";

import { Link } from "react-router-dom";

import { useAuthValue } from "../contexts/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

export default function Dashboard() {
  const { user } = useAuthValue();
  const uid = user?.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg mb-8">
          Bem-vindo ao painel de administração do Blog.
        </p>
        {loading && <p className="text-lg">Carregando...</p>}
        {posts.length === 0 && !loading && (
          <div>
            <p className="text-lg">Não foram encontrados posts</p>
            <Link
              to="/create-post"
              className="text-lg bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-2"
            >
              Criar primeiro post
            </Link>
          </div>
        )}

        {posts.length > 0 && !loading && (
          <>
            <div className="flex flex-row justify-between">
              <h2 className="text-lg font-bold px-20">Título</h2>
              <h2 className="text-lg font-bold px-20">Ações</h2>
            </div>

            {posts.map((post) => (
              <div
                key={post.id}
                className="flex justify-between items-center border-blue-50 w-[100%] py-2 px-2"
              >
                <p className="text-lg">{post.title}</p>
                <div className="flex flex-row justify-between gap-2">
                  <Link
                    to={`/post/${post.id}`}
                    className="text-lg bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Ver
                  </Link>
                  <Link
                    to={`/edit-post/${post.id}`}
                    className="text-lg bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="text-lg bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
