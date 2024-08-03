import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./layouts/dashboard";
import Login from "./layouts/login";
import Ralan from "./layouts/ralan";
import Ranap from "./layouts/ranap";
import PageNotFound from "./layouts/pageNotFound";

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
            <Route path="/farmasi" element={<PageNotFound />} />
            <Route path="/igd" element={<PageNotFound />} />
            <Route path="/radiologi" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
