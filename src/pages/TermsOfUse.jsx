export default function TermsOfUse() {
  return (
    <div className="bg-blue-50 flex flex-col min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Termos de Uso</h1>

      <p className="mb-4">
        Bem-vindo ao <strong>Ciclos e Biorritmos da Vida</strong>. Ao acessar ou
        utilizar este aplicativo, você concorda com os presentes Termos de Uso.
        Caso não concorde com qualquer uma das condições aqui descritas,
        recomendamos que não utilize o serviço.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Finalidade do Projeto
      </h2>

      <p className="mb-4">
        Este projeto possui finalidade exclusivamente educativa, informativa e
        de autoconhecimento. O conteúdo disponibilizado reúne informações sobre
        biorritmos, astronomia, ciclos naturais, história das civilizações e
        aspectos culturais relacionados à observação do tempo e do céu.
      </p>

      <p className="mb-4">
        Os cálculos apresentados são baseados na teoria clássica dos biorritmos,
        utilizando modelos matemáticos conhecidos e descritos ao longo da
        literatura histórica sobre o tema.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Limitação de Responsabilidade
      </h2>

      <p className="mb-4">
        Os resultados fornecidos pela calculadora possuem caráter exclusivamente
        informativo e recreativo. Eles não constituem diagnóstico médico,
        psicológico, psiquiátrico, financeiro, jurídico ou qualquer outro tipo
        de aconselhamento profissional.
      </p>

      <p className="mb-4">
        Nenhuma decisão relacionada à saúde, carreira, investimentos,
        relacionamentos ou qualquer aspecto relevante da vida deve ser tomada
        exclusivamente com base nas informações apresentadas neste aplicativo.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Conteúdo do Blog</h2>

      <p className="mb-4">
        Os artigos publicados têm finalidade educativa e buscam apresentar
        informações históricas, científicas, matemáticas e culturais de forma
        acessível ao público. Quando abordados temas ligados ao simbolismo ou a
        tradições antigas, estes são apresentados em seu contexto histórico e
        cultural.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Uso da Calculadora</h2>

      <p className="mb-4">
        A calculadora utiliza apenas a data de nascimento informada pelo usuário
        para gerar os gráficos e cálculos dos ciclos de biorritmos durante a
        sessão ativa do navegador.
      </p>

      <p className="mb-4">
        O usuário é responsável pela veracidade das informações fornecidas para
        realização dos cálculos.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Direitos Autorais</h2>

      <p className="mb-4">
        Todo o conteúdo disponibilizado neste projeto, incluindo textos,
        imagens, gráficos, códigos e demais materiais, é protegido pela
        legislação de direitos autorais, salvo quando indicado de forma
        diferente.
      </p>

      <p className="mb-4">
        É permitida a utilização do conteúdo para fins pessoais e educativos,
        sendo vedada sua reprodução integral para fins comerciais sem
        autorização prévia do autor.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Disponibilidade do Serviço
      </h2>

      <p className="mb-4">
        O aplicativo poderá sofrer atualizações, manutenções ou interrupções
        temporárias sem aviso prévio, visando melhorias na plataforma ou
        correções técnicas.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        7. Alterações dos Termos
      </h2>

      <p className="mb-4">
        Estes Termos de Uso poderão ser atualizados periodicamente para refletir
        melhorias no projeto, alterações legais ou novos recursos. A versão mais
        recente estará sempre disponível nesta página.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contato</h2>

      <p className="mb-4">
        Caso tenha dúvidas sobre estes Termos de Uso, utilize a página de
        contato disponível no site para enviar sua mensagem.
      </p>

      <p className="mt-8 text-gray-500">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
}
