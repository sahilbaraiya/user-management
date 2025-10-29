import { useState } from "react";
import { FiEdit2, FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Account() {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [user, setUser] = useState(loggedInUser || {});
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setIsModalOpen(false);
    toast.success("Account updated successfully! 🎉");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md border border-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Account Information</h2>

        <div className="space-y-4 text-left">
          <div>
            <p className="text-sm text-gray-400">Full Name</p>
            <p className="text-lg font-medium text-gray-200">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-medium text-gray-300">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Password</p>
            <p className="text-lg font-medium text-gray-300">
              {"•".repeat(user.password?.length || 8)}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg flex justify-center items-center gap-2"
          >
            <FiEdit2 /> Edit Profile
          </button>

          {/* <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg"
          >
            Logout
          </button> */}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-11/12 max-w-md border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-center">Edit Profile</h3>

            <div className="space-y-4">
              <input
                type="text"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                placeholder="Full Name"
              />

              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
              />

              <div className="flex items-center w-full bg-gray-800 rounded-lg border border-gray-700 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={showPassword ? "text" : "password"}
                  value={user.password || ""}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full p-3 bg-transparent text-white focus:outline-none placeholder-gray-400"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
