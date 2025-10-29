import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const isLoggedIn = localStorage.getItem("loggedInUser");

  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/account" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={isLoggedIn ? <Account /> : <Navigate to="/login" />} />
      </Routes>

      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="dark"
        />
    </Router>
  );
}
