import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import api from '../utils/api.js';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login",
      {
        email,
        password,
      });

      //save token in local storage
      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message);
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }



  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full top-[-100px] right-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-cyan-400 opacity-20 blur-[120px] rounded-full bottom-[-100px] left-[-100px]" />

      <div className="w-full max-w-6xl flex rounded-2xl overflow-hidden shadow-2xl relative z-10">

        {/* LEFT SIDE - LOGIN CARD */}
        <div className="flex-1 flex items-center justify-center p-16">
          <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
            
            <h2 className="text-3xl font-semibold text-white text-center">
              Welcome Back
            </h2>

            <p className="text-gray-400 text-center mt-2 text-sm">
              Log in to continue building intelligent AI tools
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-6">

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition duration-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition duration-300"
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-purple-500" />
                  Remember me
                </label>

                <span className="cursor-pointer bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent hover:underline">
                  Forgot password?
                </span>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:scale-[1.03] transition duration-300 shadow-lg shadow-purple-500/30"
              >
                Log In
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400 text-sm">
              Don’t have an account?{" "}
              <Link to='/signup'>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent cursor-pointer hover:underline">
                  Sign up
                </span>
              </Link>
              
            </p>

          </div>
        </div>

        {/* RIGHT SIDE - BRANDING (Hidden on small screens) */}
        <div className="hidden md:flex flex-col justify-center flex-1 p-16">
          <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to the Future of AI
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-md">
            Securely access your AI workspace and continue building
            next-generation intelligent systems.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login