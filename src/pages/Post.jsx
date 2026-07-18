import SEO from "../seo/SEO";
import Navbar2 from "../components/Navbar2";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../hooks/useFetchDocument";

export default function Post() {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);

  return (
    <>
      <SEO
        title={post ? `${post.title} | Ciclos e Biorritmos` : "Carregando..."}
        description={
          post
            ? post.body.blocks
                ?.find((b) => b.type === "paragraph")
                ?.data.text.slice(0, 160) || ""
            : ""
        }
        keywords={post ? post.tagsArray.join(", ") : ""}
        url={`https://ciclosebiorritmos.com/post/${id}`}
        image={post?.imageUrl || "https://ciclosebiorritmos.com/logo512.png"}
      />
      <Navbar2 />
      <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
        {loading && <p className="text-lg">Carregando post...</p>}
        {post && (
          <>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-[50%] h-[50%] object-cover rounded"
              />
            )}
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-4">
              Publicado em:{" "}
              {post.createdAt.toDate().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            {post.updatedAt && (
              <p className="text-gray-600 mb-4">
                Atualizado em:{" "}
                {post.updatedAt.toDate().toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            )}
            <div>
              {post.body.blocks.map((block, index) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="mb-4">
                        {block.data.text}
                      </p>
                    );

                  case "header":
                    const HeaderTag = `h${block.data.level}`;

                    return (
                      <HeaderTag key={index} className="font-bold mb-4">
                        {block.data.text}
                      </HeaderTag>
                    );

                  case "quote":
                    return (
                      <blockquote
                        key={index}
                        className="border-l-4 pl-4 italic"
                      >
                        {block.data.text}
                      </blockquote>
                    );

                  case "list":
                    return block.data.style === "ordered" ? (
                      <ol key={index} className="list-decimal ml-6 mb-4">
                        {block.data.items.map((item, i) => (
                          <li key={i}>{item.content}</li>
                        ))}
                      </ol>
                    ) : (
                      <ul key={index} className="list-disc ml-6 mb-4">
                        {block.data.items.map((item, i) => (
                          <li key={i}>{item.content}</li>
                        ))}
                      </ul>
                    );

                  default:
                    return null;
                }
              })}
            </div>
            <h3 className="text-base font-bold">Este post trata sobre:</h3>
            <div className="flex flex-row">
              {post.tagsArray.map((tag) => (
                <p className="mr-4" key={tag}>
                  <span className="text-sm font-bold">#</span>
                  {tag}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
