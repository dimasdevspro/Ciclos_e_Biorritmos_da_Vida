import SEO from "../seo/SEO";
import Navbar2 from "../components/Navbar2";

import { Link } from "react-router-dom";

import { useAuthValue } from "../contexts/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";

export default function Blog() {
  const { user } = useAuthValue();
  const uid = user?.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  return (
    <>
      <SEO
        title="Artigos"
        description="Leia artigos sobre ciclos, biorritmos, astronomia e ciência."
        keywords="artigos ciclos, biorritmo, astronomia, ciência"
        url="https://ciclosebiorritmos.com/blog"
      />
      <Navbar2 />
      <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
        <p className="mb-6 text-lg leading-8">
          Este blog reúne artigos sobre biorritmos, astronomia, história da
          observação dos céus, ciclos naturais, fases da Lua, calendários
          antigos e outros temas relacionados ao estudo do tempo e dos
          movimentos celestes.
        </p>
        {loading && <p className="text-lg">Carregando...</p>}
        {!loading && posts.length === 0 && (
          <>
            <Navbar2 />
            <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
              <h1 className="text-3xl font-bold mb-4">
                Artigos não encontrados
              </h1>
              <p>Os artigos solicitados não existem ou foram removidos.</p>
              <Link
                to="/create-post"
                className="text-lg bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-2"
              >
                Criar primeiro post
              </Link>
            </div>
          </>
        )}

        {posts.length > 0 && !loading && (
          <>
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-between items-left border-blue-50 w-[100%] py-2 px-2 pr-20"
              >
                <img className="w-80" src={post.imageUrl} alt={post.title} />
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm">
                  Publicado em:{" "}
                  {post.createdAt.toDate().toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <p className="text-base">{post.body.blocks[1].data.text}...</p>
                <p className="text-base flex flex-row">
                  {post.tagsArray.map((tag) => (
                    <p className="mr-4" key={tag}>
                      <span className="text-sm font-bold">#</span>
                      {tag}
                    </p>
                  ))}
                </p>
                <div className="flex flex-row justify-between gap-2">
                  <Link
                    to={`/post/${post.id}`}
                    className="mb-4 text-lg bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Ler artigo
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
