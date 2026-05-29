export default function Contato() {
  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Contato</h1>
      <p className="mb-4">
        Entre em contato conosco através dos canais abaixo:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Email:{" "}
          <a href="mailto:dimasdevspro@gmail.com">dimasdevspro@gmail.com</a>
        </li>
        <li>
          Telefone:{" "}
          <a
            href="https://wa.me/+5511932228112"
            target="_blank"
            rel="noopener noreferrer"
          >
            +55 (11) 93222-8112
          </a>
        </li>
        <li>
          Endereço:{" "}
          <div
            className="w-full max-w-2xl mt-2 overflow-hidden rounded-lg"
            style={{ aspectRatio: "4/3" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.7763948766706!2d-46.68331432414101!3d-23.683953166108513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4fe4afe420cd%3A0x2408858c80b3992!2sR.%20S%C3%A3o%20Constantino%2C%20207%20-%20Vila%20Santa%20Cruz%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004456-000!5e0!3m2!1spt-BR!2sbr!4v1780009494239!5m2!1spt-BR!2sbr"
              title="Localização no Google Maps"
              className="w-full h-full"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </li>
      </ul>
    </div>
  );
}
