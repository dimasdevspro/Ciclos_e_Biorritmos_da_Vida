export default function Disclaimer() {
  return (
    <div className="bg-blue-50 flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Aviso Legal (Disclaimer)</h1>

      <p className="mb-4">
        O <strong>Ciclos e Biorritmos da Vida</strong> é um projeto de caráter
        educativo, informativo e cultural, desenvolvido com o objetivo de
        divulgar conhecimentos relacionados aos biorritmos, astronomia,
        cronobiologia, história das civilizações, matemática e simbolismo dos
        ciclos naturais.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Finalidade Educativa
      </h2>

      <p className="mb-4">
        Todo o conteúdo disponibilizado neste site tem finalidade exclusivamente
        educativa e informativa. Os artigos procuram apresentar temas
        históricos, científicos, matemáticos e culturais de forma acessível,
        incentivando o estudo, a reflexão e o autoconhecimento.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Sobre os Biorritmos
      </h2>

      <p className="mb-4">
        A calculadora disponibilizada neste projeto utiliza a teoria clássica
        dos biorritmos, baseada em modelos matemáticos periódicos calculados a
        partir da data de nascimento do usuário.
      </p>

      <p className="mb-4">
        A teoria dos biorritmos possui relevância histórica e cultural, porém
        suas interpretações sobre desempenho humano não constituem consenso
        científico. Os resultados apresentados devem ser compreendidos como uma
        representação matemática desse modelo tradicional.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        3. Conteúdo Histórico e Cultural
      </h2>

      <p className="mb-4">
        Os artigos que abordam astrologia, simbolismo, fases da Lua,
        constelações, mitologias ou tradições antigas têm como objetivo
        apresentar aspectos históricos, antropológicos e culturais desenvolvidos
        por diferentes civilizações ao longo da história.
      </p>

      <p className="mb-4">
        A apresentação desses conteúdos não representa validação científica de
        interpretações simbólicas, religiosas ou filosóficas, mas sim o
        reconhecimento de sua importância histórica para a compreensão da
        evolução do conhecimento humano.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        4. Não Substitui Orientação Profissional
      </h2>

      <p className="mb-4">
        As informações disponibilizadas neste site não substituem orientação
        médica, psicológica, psiquiátrica, nutricional, jurídica, financeira ou
        de qualquer outro profissional qualificado.
      </p>

      <p className="mb-4">
        Nenhuma decisão relacionada à saúde, tratamentos, investimentos,
        relacionamentos, trabalho ou questões legais deve ser tomada com base
        exclusiva nas informações apresentadas pela calculadora ou pelos artigos
        deste projeto.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Precisão das Informações
      </h2>

      <p className="mb-4">
        O conteúdo é elaborado com base em referências históricas, conhecimentos
        científicos consolidados quando aplicáveis e literatura relacionada aos
        temas abordados. Apesar do cuidado na preparação do material, podem
        ocorrer revisões, atualizações ou correções ao longo do tempo.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Serviços de Terceiros
      </h2>

      <p className="mb-4">
        O aplicativo poderá utilizar serviços externos para obtenção de dados
        astronômicos, hospedagem, estatísticas de acesso ou exibição de
        anúncios, respeitando sempre a Política de Privacidade disponível neste
        site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Publicidade</h2>

      <p className="mb-4">
        Este projeto poderá exibir anúncios fornecidos por plataformas de
        publicidade, como o Google AdSense. Esses anúncios podem utilizar
        cookies e outras tecnologias para apresentar publicidade relevante,
        conforme descrito na Política de Privacidade.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        8. Aceitação deste Aviso
      </h2>

      <p className="mb-4">
        Ao continuar utilizando este site, você declara estar ciente das
        informações apresentadas neste Aviso Legal e concorda que o uso do
        conteúdo ocorre por sua livre iniciativa e responsabilidade.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contato</h2>

      <p className="mb-4">
        Em caso de dúvidas, sugestões ou solicitações relacionadas ao conteúdo
        deste projeto, utilize a página de contato disponível no site.
      </p>

      <p className="mt-8 text-gray-500">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
}
