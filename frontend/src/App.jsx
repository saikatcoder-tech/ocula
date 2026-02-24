import { Routes, Route } from "react-router-dom";


import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Credits from "./pages/Credits";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="generate" element={<Generate />} />
        <Route path="credits" element={<Credits />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;