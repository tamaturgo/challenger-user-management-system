import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./views/Welcome";
import Unauthorized from "./views/Unauthorized";
import { UserRole } from "./enum/UserRole";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute requiredRole={UserRole.ADMIN}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/welcome" 
              element={
                <PrivateRoute requiredRole={UserRole.USER}>
                  <Welcome />
                </PrivateRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
