import Navbar2 from "../components/Navbar2";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../contexts/AuthContext";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { useFetchDocument } from "../hooks/useFetchDocument";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";

// EditorJS
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
// REMOVIDO: import Paragraph from "@editorjs/paragraph";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState(null);
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { document: post } = useFetchDocument("posts", id);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.imageUrl);
      setBody(post.body);
      setTags(post.tagsArray.join(", "));
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");

  const editorRef = useRef(null);
  const isInitialized = useRef(false); // Evita inicialização dupla no StrictMode

  const navigate = useNavigate();
  const { user } = useAuthValue();

  useEffect(() => {
    if (!body || isInitialized.current) return;

    isInitialized.current = true;

    const editor = new EditorJS({
      holder: "editorjs",
      data: body,

      tools: {
        header: Header,
        list: List,
        quote: Quote,
      },

      placeholder: "Escreva seu artigo aqui...",

      onReady: () => {
        editorRef.current = editor;
      },
    });

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        isInitialized.current = false;
      }
    };
  }, [body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Validação preventiva antes de interagir com o editor
    if (!editorRef.current) {
      setFormError("O editor de texto ainda não foi carregado completamente.");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    let body;
    try {
      // Salva o conteúdo do EditorJS
      body = await editorRef.current.save();
    } catch (error) {
      setFormError("Erro ao salvar o conteúdo do editor.");
      return;
    }

    if (!title || !tags || !body.blocks || body.blocks.length === 0) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    let imageUrl = post.imageUrl;

    if (image instanceof File) {
      const extensao = image.name.split(".").pop();
      const imageRef = ref(storage, `posts/${id}.${extensao}`);

      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    try {
      await updateDocument(id, {
        title,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
        imageUrl,
        createdAt: post.createdAt,
        updatedAt: Timestamp.now(),
      });

      navigate("/dashboard");
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Editar Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-lg font-medium">Título</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Digite o título do post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Imagem */}
          {image && (
            <img
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={post?.title}
              className="w-[50%] h-[50%] object-cover rounded"
            />
          )}
          <div>
            <label className="block text-lg font-medium">Imagem</label>
            <input
              type="file"
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              onChange={(e) => setImage(e.target.files[0] || null)}
            />
          </div>

          {/* Editor */}
          <div>
            <label className="block text-lg font-medium mb-2">Conteúdo</label>
            <div
              id="editorjs"
              className="bg-white border border-gray-300 rounded-md p-4 min-h-[400px]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-lg font-medium">Tags</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="astronomia, biorritmos, egito"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Botões de Ação */}
          {!response.loading ? (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Editar Post
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-400 text-white py-2 px-4 rounded-md cursor-not-allowed"
            >
              Aguarde...
            </button>
          )}

          {response.error && (
            <p className="bg-red-500 text-white p-3 rounded">
              {response.error}
            </p>
          )}

          {formError && (
            <p className="bg-red-500 text-white p-3 rounded">{formError}</p>
          )}
        </form>
      </div>
    </>
  );
}
