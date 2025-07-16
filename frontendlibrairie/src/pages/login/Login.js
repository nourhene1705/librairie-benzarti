import React, { useState } from "react";
import ImageLogo from "../../assets/images.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/slices/adminSlice";
import axios from "axios";
import { endpoint } from "../../utils/Config";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // تحقق من الحقول قبل الإرسال
    if (!credentials.email || !credentials.password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await axios.post(endpoint.login, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        const adminData = response.data.data.admin;

        // حفظ بيانات تسجيل الدخول في Redux
        dispatch(
          loginAdmin({
            id: adminData.id,
            name: adminData.name,
            email: adminData.email,
            role: adminData.role,
          })
        );

        toast.success(response.data.message || "Connexion réussie");

        // لو اخترت "تذكرني" يمكن تخزين بيانات أو token هنا حسب حاجتك
        if (rememberMe) {
          localStorage.setItem("adminEmail", credentials.email);
          // ممكن تخزين token أو غيره
        }

        setTimeout(() => navigate("/admin/categories"), 700);
      } else {
        toast.error(response.data.message || "Erreur lors de la connexion");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-400 to-blue-950 p-6">
      <ToastContainer position="top-center" />
      <div className="bg-gray-200 p-8 rounded-3xl w-full max-w-md hover:shadow-2xl">
        {/* Logo */}
        <div className="w-32 h-32 mx-auto mb-6">
          <img src={ImageLogo} alt="logo" className="w-full h-full object-contain" />
        </div>

        {/* Formulaire */}
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          {/* Champ Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={credentials.email}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-gray-700 font-medium">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Entrez votre mot de passe"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 pr-10"
            />
            <div
              className="absolute right-3 top-[38px] text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMe}
              className="cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm select-none cursor-pointer">
              Remember Password
            </label>
          </div>

          {/* Bouton Login */}
          <button
            type="submit"
            className="bg-gradient-to-tr from-slate-300 to-blue-900 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full mt-4 mx-auto w-full max-w-[200px] transform transition-all duration-300 hover:scale-105"
          >
            Se connecter
          </button>
        </form>

        <p className="font-semibold mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-900 hover:underline">
            Register
          </Link>
        </p>

        {/* Lien mot de passe oublié */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Mot de passe oublié ?{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">Réinitialiser</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
