import SEO from "../seo/SEO";
// ================= FRONTEND (React App.jsx) =================
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";

const CustomDot = (props, tipo) => {
  const { cx, cy, payload } = props;

  if (!payload || !payload.status) return null; // 🛑 PROTEÇÃO

  const status = payload.status[tipo];

  if (!status) return null;

  let cor = "gray";
  let tamanho = 4;

  if (status.tipo === "positivo") cor = "green";
  if (status.tipo === "negativo") cor = "red";
  if (status.tipo === "critico") {
    cor = "purple";
    tamanho = 7;
  }
  if (status.tipo === "critico") {
    cor = "purple";
    tamanho = 7;
  } else if (status.alerta) {
    cor = "yellow";
  } else if (status.tipo === "positivo") {
    cor = "green";
  } else if (status.tipo === "negativo") {
    cor = "red";
  }

  return <circle cx={cx} cy={cy} r={tamanho} fill={cor} />;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    const f = data.status?.fisico;
    const e = data.status?.emocional;
    const m = data.status?.intelectual;

    return (
      <div className="bg-blue-200 p-3 border rounded">
        <p>
          <strong>Data:</strong> {data.data}
        </p>
        <p>
          <strong>Biorritmo Físico:</strong> {data.fisico} ({f?.tipo})
        </p>
        <p>
          <strong>Biorritmo Emocional:</strong> {data.emocional} ({e?.tipo})
        </p>
        <p>
          <strong>Biorritmo Intelectual:</strong> {data.intelectual} ({m?.tipo})
        </p>
      </div>
    );
  }
  return null;
};

export default function Calculator() {
  const [nome, setNome] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [grafico, setGrafico] = useState([]);
  const [proximosCriticos, setProximosCriticos] = useState([]);
  const [diasPositivos, setDiasPositivos] = useState([]);
  const [ceu, setCeu] = useState(null);
  const [lua, setLua] = useState(null);
  const [aceite, setAceite] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const resultadoRef = useRef(null);
  const graficoRef = useRef(null);

  const calcular = async () => {
    setLoading(true);

    // ✅ VALIDAÇÃO LEVE AQUI
    if (!nascimento || nascimento.length !== 10) {
      alert("Digite a data completa (DD/MM/AAAA)");
      setLoading(false);
      return;
    }

    const formatarDataParaISO = (dataBR) => {
      const [dia, mes, ano] = dataBR.split("/");
      return `${ano}-${mes}-${dia}`;
    };

    try {
      const res = await fetch(
        "https://ciclosebiorritmosdavidabackend.vercel.app/calcular",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            nascimento: formatarDataParaISO(nascimento),
          }),
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      setResultado(data);
      setGrafico(data?.grafico || []);

      // 🔴 próximos dias críticos
      const criticos = (data?.grafico || []).filter(
        (item) => item.dia > 0 && item.alerta,
      );

      // 🟢 melhores dias
      const positivos = (data?.grafico || [])
        .filter(
          (item) =>
            item.status?.fisico?.tipo === "positivo" &&
            item.status?.emocional?.tipo === "positivo" &&
            item.status?.intelectual?.tipo === "positivo",
        )
        .slice(0, 3);

      setProximosCriticos(criticos);
      setDiasPositivos(positivos);

      const resCeu = await fetch(
        "https://ciclosebiorritmosdavidabackend.vercel.app/ceu",
      );
      const dataCeu = await resCeu.json();

      setCeu(dataCeu);

      const resLua = await fetch(
        "https://ciclosebiorritmosdavidabackend.vercel.app/lua",
      );
      const dataLua = await resLua.json();

      setLua(dataLua);
    } catch (error) {
      console.error("Erro ao calcular:", error);
      alert(
        "Erro ao calcular. Verifique se o backend está rodando e os dados estão corretos.",
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    window.scrollTo(0, 0);

    if (!resultadoRef.current) return;

    try {
      setDownloadingPDF(true);

      const element = resultadoRef.current;

      const options = {
        margin: 10,

        filename: `${resultado.nome}_ciclos_biorritmos.pdf`,

        image: { type: "png", quality: 1 },

        html2canvas: {
          scale: 3,
          useCORS: true,
          backgroundColor: "#ffffff",
          removeContainer: true,
          logging: false,
        },

        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },

        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await document.fonts.ready;

      await new Promise((resolve) => requestAnimationFrame(resolve));

      await new Promise((resolve) => setTimeout(resolve, 500));

      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);

      alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
      setDownloadingPDF(false);
    }
  };

  const downloadGraficoPDF = async () => {
    if (!graficoRef.current) return;

    try {
      const canvas = await html2canvas(graficoRef.current, {
        scale: 3,
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape", "mm", "a4");

      const larguraPDF = pdf.internal.pageSize.getWidth();

      const alturaPDF = pdf.internal.pageSize.getHeight();

      const proporcao = canvas.width / canvas.height;

      let larguraImg = larguraPDF - 20;

      let alturaImg = larguraImg / proporcao;

      if (alturaImg > alturaPDF - 20) {
        alturaImg = alturaPDF - 20;

        larguraImg = alturaImg * proporcao;
      }

      const x = (larguraPDF - larguraImg) / 2;

      const y = (alturaPDF - alturaImg) / 2;

      pdf.addImage(imgData, "PNG", x, y, larguraImg, alturaImg);

      pdf.save(`grafico-${resultado.nome}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF do gráfico:", error);
      alert("Erro ao gerar PDF do gráfico. Tente novamente.");
    }
  };

  const insight = resultado?.insight
    ? [
        resultado.insight.fisico,
        resultado.insight.emocional,
        resultado.insight.intelectual,
      ]
    : ["-", "-", "-"];

  const hoje = new Date().toLocaleDateString("pt-BR");

  return (
    <>
      <SEO
        title="Calculadora de Biorritmo"
        description="Calcule gratuitamente seus biorritmos físico, emocional e intelectual."
        keywords="biorritmo, biorritmo online, biorritmo físico, biorritmo emocional"
        url="https://ciclosebiorritmos.com/calculadora"
      />
      <div className="max-w-7xl mx-auto">
        <div className="min-h-screen bg-blue-50 p-4 md:p-8">
          <h2 className="text-xl font-bold mb-2">Calculadora</h2>
          <p className="text-sm mb-4">
            Insira seu nome e data de nascimento abaixo:
          </p>
          <div className="flex gap-2 mb-4">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                className="bg-blue-100 border p-2 rounded w-full"
                placeholder="Nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="DD/MM/AAAA"
                className="bg-blue-100 border p-2 rounded w-full placeholder-gray-500"
                value={nascimento}
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, ""); // só números

                  if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                  if (v.length > 5) v = v.slice(0, 5) + "/" + v.slice(5, 9);

                  setNascimento(v);
                }}
              />
              <button
                onClick={calcular}
                disabled={!aceite || loading}
                className={`px-4 py-2 rounded text-white ${
                  !aceite || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {loading ? "Calculando..." : "Calcular"}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={aceite}
              onChange={(e) => setAceite(e.target.checked)}
            />
            <label className="text-xs text-gray-600">
              Li e concordo com a{" "}
              <a
                href="/privacidade"
                target="_blank"
                className="hover:underline text-blue-500"
              >
                Política de Privacidade.
              </a>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Seus dados são utilizados apenas para cálculo e não são armazenados.
          </p>
          {resultado && grafico.length > 0 && (
            <>
              <div
                ref={resultadoRef}
                className="space-y-4 bg-blue-100 rounded-2xl opacity-100"
              >
                {/* Cards de Resultado */}
                <div
                  className="mt-6 p-6 rounded-2xl bg-blue-100 border-blue-100"
                  style={{ breakInside: "avoid" }}
                >
                  <h2 className="text-xl font-bold border-b pb-2">
                    Resultado - Ciclos e Biorritmos - {hoje}
                  </h2>

                  <p>
                    <strong>Nome:</strong> {resultado.nome}
                  </p>
                  <p>
                    <strong>Dias vividos:</strong> {resultado.diasVividos}
                  </p>
                  <p>
                    <strong>Anos vividos:</strong> {resultado.anosVividos}
                  </p>

                  {/* Cards de Dia/Hora AMORC */}
                  <h2 className="mt-6 font-semibold text-center">
                    📅 Dia / ⏰ Hora (AMORC)
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-blue-200 rounded-xl">
                      <p className="font-semibold">
                        📅 Dia: {hoje} ({resultado.diaSemana})
                      </p>
                      <p>Planeta: {resultado.planetaDia}</p>
                      <p>Nota: {resultado.notaDia}</p>
                    </div>

                    <div className="p-4 bg-blue-200 rounded-xl">
                      <p className="font-semibold">
                        ⏰ Hora: {new Date().toLocaleTimeString("pt-BR")}
                      </p>
                      <p>Planeta: {resultado.planetaHora}</p>
                      <p>Nota: {resultado.notaHora}</p>
                    </div>
                  </div>

                  {/* Insights */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div
                      className="p-3 bg-blue-200 rounded"
                      style={{ breakInside: "avoid" }}
                    >
                      <strong>Biorritmo Físico:</strong> {insight[0]?.tipo}
                    </div>

                    <div
                      className="p-3 bg-blue-200 rounded"
                      style={{ breakInside: "avoid" }}
                    >
                      <strong>Biorritmo Emocional:</strong> {insight[1]?.tipo}
                    </div>

                    <div
                      className="p-3 bg-blue-200 rounded"
                      style={{ breakInside: "avoid" }}
                    >
                      <strong>Biorritmo Intelectual:</strong> {insight[2]?.tipo}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div
                      className="p-4 rounded-xl bg-blue-200 transition-all hover:scale-105"
                      style={{ breakInside: "avoid" }}
                    >
                      <p className="font-bold text-black-700 dark:text-black-300">
                        ⚠️ Dias Críticos
                      </p>
                      {proximosCriticos?.map((d, i) => (
                        <p key={i}>{d.data}</p>
                      ))}
                    </div>

                    <div
                      className="p-4 rounded-xl bg-blue-200 transition-all hover:scale-105"
                      style={{ breakInside: "avoid" }}
                    >
                      <p className="font-bold text-black-700 dark:text-g-black-300">
                        ✅ Melhores Dias
                      </p>
                      {diasPositivos?.map((d, i) => (
                        <p key={i}>{d.data}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ breakBefore: "page" }}>
                  {/* Cards de Astronomia */}
                  <h2 className="mt-6 font-semibold text-center">
                    🔭 Céu atual (Astronomia)
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* 🌍 Planetas */}
                    <div className="p-4 bg-blue-200 rounded-xl ml-6">
                      <p className="font-bold">
                        🪐 Planetas visíveis no Horizonte
                      </p>

                      {!ceu && <p>Carregando...</p>}

                      {ceu?.visiveis?.length > 0 ? (
                        ceu.visiveis.map((p, i) => (
                          <p key={i}>
                            • {p.nome} — {p.altitude}°
                          </p>
                        ))
                      ) : ceu ? (
                        <p>Nenhum planeta visível agora</p>
                      ) : null}
                    </div>

                    {/* 🌙 Lua */}
                    <div className="p-4 bg-blue-200 rounded-xl mr-6">
                      <p className="font-bold">🌙 Lua</p>

                      {lua ? (
                        <>
                          <p>
                            <strong>Fase:</strong> {lua.fase}
                          </p>

                          <p>
                            <strong>Iluminação:</strong>{" "}
                            {(lua.iluminacao * 100).toFixed(0)}%
                          </p>

                          {lua.moonrise && (
                            <p>
                              <strong>Nascer:</strong> {lua.moonrise}
                            </p>
                          )}

                          {lua.moonset && (
                            <p>
                              <strong>Ocaso:</strong> {lua.moonset}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>Carregando...</p>
                      )}
                    </div>

                    {/* 🌌 Fenômenos Astronômicos */}
                    <div className="md:col-span-2 p-4 bg-blue-200 rounded-xl ml-6 mr-6 mb-6">
                      <p className="font-bold text-lg mb-4">
                        🌌 Fenômenos Astronômicos do Céu Atual
                      </p>

                      {!ceu ? (
                        <p>Carregando...</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-blue-400">
                                <th className="text-left py-2">Fenômeno</th>
                                <th className="text-left py-2">Constelação</th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr className="border-b border-blue-300">
                                <td className="py-2">
                                  🌌 Constelação do Zênite
                                </td>
                                <td>{ceu?.zenite || "N/A"}</td>
                              </tr>

                              <tr className="border-b border-blue-300">
                                <td className="py-2">🌅 Horizonte Leste</td>
                                <td>{ceu?.horizonteLeste || "N/A"}</td>
                              </tr>

                              <tr className="border-b border-blue-300">
                                <td className="py-2">🌇 Horizonte Oeste</td>
                                <td>{ceu?.horizonteOeste || "N/A"}</td>
                              </tr>

                              <tr className="border-b border-blue-300">
                                <td className="py-2">
                                  ☀️ Constelação Culminante
                                </td>
                                <td>{ceu?.culminante || "N/A"}</td>
                              </tr>

                              <tr className="border-b border-blue-300">
                                <td className="py-2">
                                  🍂 Constelação sazonal dominante
                                </td>
                                <td>{ceu?.sazonal || "N/A"}</td>
                              </tr>

                              <tr className="border-b border-blue-300">
                                <td className="py-2">
                                  🧭 Constelações circumpolares - fixas
                                </td>
                                <td>
                                  {ceu?.circumpolares?.length > 0
                                    ? ceu.circumpolares.join(", ")
                                    : "N/A"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gráfico */}
              <div
                ref={graficoRef}
                className="w-full h-[400px] md:h-[500px] mt-6 p-4 rounded-2xl bg-blue-200 border-blue-100 mx-auto"
                style={{
                  width: "100%",
                  minHeight: 560,
                  margin: "1.5rem auto 0",
                }}
              >
                <p className="font-bold text-lg mb-4">
                  Gráfico de Biorritmos - 30 dias (Hoje = dia 0)
                </p>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={grafico}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis domain={[0, 36]} ticks={[0, 7, 14, 21, 28, 33]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    {/* Linha HOJE */}
                    <ReferenceLine x={1} stroke="black" strokeDasharray="3 3" />

                    <Line
                      type="monotone"
                      dataKey="fisico"
                      dot={(props) => CustomDot(props, "fisico")}
                      stroke="#3b82f6"
                      strokeWidth={2}
                      isAnimationActive
                    />
                    <Line
                      type="monotone"
                      dataKey="emocional"
                      dot={(props) => CustomDot(props, "emocional")}
                      stroke="#10b981"
                      strokeWidth={2}
                      isAnimationActive
                    />
                    <Line
                      type="linear"
                      dataKey="intelectual"
                      dot={(props) => CustomDot(props, "intelectual")}
                      stroke="#f59e0b"
                      strokeWidth={2}
                      isAnimationActive
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Legenda */}
                <div className="text-sm mt-4">
                  <p>
                    <strong>Legenda:</strong>
                  </p>
                  <p>🟢 Verde = positivo</p>
                  <p>🔴 Vermelho = negativo</p>
                  <p>🟣 Roxo = crítico</p>
                  <p>🟡 Amarelo = precaução mínima</p>
                  <p>📱 Visualização no celular, gire na horizontal.</p>
                </div>
              </div>

              {/* Botão Download PDF */}
              <div className="flex flex-col md:flex-row gap-4 justify-center mt-[2rem] mb-10">
                <button
                  onClick={downloadPDF}
                  disabled={downloadingPDF}
                  className={`px-6 py-3 rounded-lg text-white font-semibold ${
                    downloadingPDF
                      ? "bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {downloadingPDF ? "Gerando PDF..." : "📄 Baixar Relatório"}
                </button>
                <button
                  onClick={downloadGraficoPDF}
                  className="px-6 py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600"
                >
                  📈 Baixar Gráfico
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
