import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./layouts/Dashboard";
import Login from "./layouts/Login";
import Ralan from "./layouts/Ralan";
import Ranap from "./layouts/Ranap";
import Farmasi from "./layouts/Farmasi";
import PageNotFound from "./layouts/PageNotFound";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ralan" element={<Ralan />} />
            <Route path="/ranap" element={<Ranap />} />
            <Route path="/farmasi" element={<Farmasi />} />
            <Route path="/igd" element={<PageNotFound />} />
            <Route path="/radiologi" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
