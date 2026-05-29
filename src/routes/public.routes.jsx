import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculadora from "../pages/Calculator";
import Blog from "../pages/Blog";
import Sobre from "../pages/Sobre";
import Contato from "../pages/Contato";
import Privacidade from "../pages/Privace";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PublicRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/privacidade" element={<Privacidade />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
