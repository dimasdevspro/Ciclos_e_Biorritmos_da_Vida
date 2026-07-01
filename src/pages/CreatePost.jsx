import Navbar2 from "../components/Navbar2";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../contexts/AuthContext";
import { useInsertDocument } from "../hooks/useInsertDocument";
import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";

// EditorJS
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
// REMOVIDO: import Paragraph from "@editorjs/paragraph";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const editorRef = useRef(null);
  const isInitialized = useRef(false); // Evita inicialização dupla no StrictMode

  const { insertDocument, response } = useInsertDocument("posts");
  const navigate = useNavigate();
  const { user } = useAuthValue();
  console.log("CreatePost user:", user);

  useEffect(() => {
    // Garante que o editor só seja criado uma única vez
    if (!isInitialized.current) {
      isInitialized.current = true;

      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          quote: Quote,
          // REMOVIDO: paragraph: Paragraph (O Editor.js já faz isso nativamente)
        },
        placeholder: "Escreva seu artigo aqui...",
        onReady: () => {
          editorRef.current = editor;
        },
      });
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
        isInitialized.current = false;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    console.log("User no submit:", user);
    console.log("UID:", user?.uid);
    console.log("DisplayName:", user?.displayName);
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
      console.log(body);
    } catch (error) {
      setFormError("Erro ao salvar o conteúdo do editor.");
      return;
    }

    if (!title || !image || !tags || !body.blocks || body.blocks.length === 0) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    let imageUrl = "";

    if (image) {
      const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    console.log("vai gravar", {
      title,
      body,
      tagsArray,
      uid: user.uid,
      imageUrl,
    });

    await insertDocument({
      title,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
      imageUrl,
      createdAt: Timestamp.now(),
    });

    console.log("Gravou!");

    navigate("/dashboard");
  };

  return (
    <>
      <Navbar2 />
      <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Criar Novo Post</h1>

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
              Criar Post
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
