import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <div>
      {/* FOOTER */}
      <footer className="bg-blue-100">
        <div className="max-w-5xl mx-auto p-4 text-center text-sm text-black-200">
          Desenvolvido por{" "}
          <a
            href="https://devsprosolution.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            DevsPro Solution
          </a>{" "}
          © {new Date().getFullYear()}
          <p className="mt-2">
            Siga-nos nas redes sociais:{" "}
            <a
              href="https://www.instagram.com/devsprosolution/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <AiFillInstagram className="inline" size={20} />
            </a>{" "}
            <a
              href="https://www.linkedin.com/in/dimas-apereira/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <AiFillLinkedin className="inline" size={20} />
            </a>
          </p>
          <p className="mt-2">
            <a href="/privacidade" className="hover:underline text-blue-500">
              Política de Privacidade
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
