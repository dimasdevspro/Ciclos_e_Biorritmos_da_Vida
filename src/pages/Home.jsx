export default function Home() {
  return (
    <div className="container mx-auto bg-blue-50 px-4 py-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Bem-vindo ao Ciclos e Biorritmos da Vida
      </h1>
      <p className="text-lg mb-6">
        Descubra como os ciclos naturais influenciam sua vida e aprenda a viver
        em harmonia com eles, se aproximando de como as civilizações antigas
        tentavam usar o conhecimento dos ciclos para melhorar sua saúde,
        produtividade e bem-estar. Com nossa calculadora de biorritmos, você
        pode:
      </p>
      <p className="text-lg mb-6">
        <ul className="list-disc list-inside mb-4">
          <li>Entender seus ciclos físicos, emocionais e intelectuais</li>
          <li>Planejar suas atividades de acordo com seus picos de energia</li>
          <li>Melhorar seu bem-estar e produtividade</li>
          <li>Conectar-se com os ritmos naturais do mundo ao seu redor</li>
          <li>Explorar artigos e recursos sobre ciclos e biorritmos</li>
          <li>Compartilhar seus resultados e experiências</li>
          <li>
            Comparar seus biorritmos e ciclos com as culturas de antigas
            civilizações interpretavam os resultados
          </li>
        </ul>
      </p>
      <a href="/sobre" className="text-blue-500 hover:underline">
        Saiba mais sobre o aplicativo.
      </a>
    </div>
  );
}
