import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "../contexts/AuthContext";

import Home from "../pages/Home";
import Calculadora from "../pages/Calculator";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import Sobre from "../pages/Sobre";
import Contato from "../pages/Contato";
import Privacidade from "../pages/Privace";
import TermosUso from "../pages/TermsOfUse";
import AvisoLegal from "../pages/Disclaimer";
import Post from "../pages/Post";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import Dashboard from "../pages/Dashboard";
import Footer from "../components/Footer";
import Navbar1 from "../components/Navbar1";

// rotas protegidas
import PrivateRoute from "../components/PrivateRoute";

export default function routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar1 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termosdeuso" element={<TermosUso />} />
          <Route path="/avisolegal" element={<AvisoLegal />} />
          <Route path="/post/:id" element={<Post />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-post/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
