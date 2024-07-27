import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./layouts/dashboard";
import Login from "./layouts/login";
import Ralan from "./layouts/ralan";
import Ranap from "./layouts/ranap";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ralan" element={<Ralan />} />
            <Route path="/ranap" element={<Ranap />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
