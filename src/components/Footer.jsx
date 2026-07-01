import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <div>
      {/* FOOTER */}
      <footer className="bg-blue-100">
        <div className="max-w-5xl mx-auto p-4 text-center text-sm text-black-200">
          <p className="mb-2">
            © {new Date().getFullYear()} Ciclos e Biorritmos da Vida. Todos os
            direitos reservados.
          </p>
          Desenvolvido por{" "}
          <a
            href="https://devsprosolution.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            DevsPro Solution
          </a>{" "}
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
          <div className="mt-3 flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-center">
            <p className="m-0">
              <a href="/privacidade" className="hover:underline text-blue-500">
                Política de Privacidade
              </a>
            </p>
            <span className="text-gray-500 select-none">•</span>
            <p className="m-0">
              <a href="/termosdeuso" className="hover:underline text-blue-500">
                Termos de Uso
              </a>
            </p>
            <span className="text-gray-500 select-none">•</span>
            <p className="m-0">
              <a href="/avisolegal" className="hover:underline text-blue-500">
                Aviso Legal
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
