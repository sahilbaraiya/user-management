import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/account");
    } else {
      toast.warning("Invalid credentials");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Welcome Back
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex items-center w-full bg-gray-800 rounded-lg border border-gray-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none placeholder-gray-400"
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-3 text-gray-400 hover:text-blue-400 transition-colors"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
            onClick={() => navigate("/register")}
          >
            SignUp
          </span>
        </p>
      </form>

       
      
    </div>
  );
}
