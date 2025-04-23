import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff, FiMoon, FiSun } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
const LoginPage = () => {
  const [showpwd, setShowpwd] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    username: "",
    pwd: ""
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernameRegex.test(formLogin.username)) {
      newErrors.username = "Please enter a valid username address";
    }

    if (!pwdRegex.test(formLogin.pwd)) {
      newErrors.pwd = "pwd must be at least 8 characters with letters and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        console.log(res.data)
        localStorage.setItem("user", res.data.username);
        localStorage.setItem("role", res.data.accRole);
        localStorage.setItem("accountId", res.data.accountId);
        localStorage.setItem("employeeId", res.data.employeeId);
        if (res.data.accRole === "admin")
          navigate("/admin", { replace: true });
        else navigate("/user", { replace: true });
        return;
      }
      throw new Error(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    loginAction(formLogin);
    return;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLogin(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`w-full min-h-screen flex  ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
      {/* Left Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-md text-center">
          <img
            src="./src/assets/TimoThumbnail.png"
            alt="HR Analytics"
            className="w-full h-full object-cover rounded-lg shadow-xl mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-4">HR KPI Analytics Employees Performance</h1>
          <p className="text-blue-100">Transform your HR metrics into actionable insights</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Login</h2>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="username"
                  id="username"
                  name="username"
                  value={formLogin.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.username ? "border-red-500" : ""}`}
                  placeholder="you@company.com"
                  required
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="pwd">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showpwd ? "text" : "password"}
                  id="pwd"
                  name="pwd"
                  value={formLogin.pwd}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.pwd ? "border-red-500" : ""}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowpwd(!showpwd)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showpwd ? <FiEyeOff /> : <FiEye />}
                </button>
                {errors.pwd && <p className="text-red-500 text-sm mt-1">{errors.pwd}</p>}
              </div>
            </div>

            {/* <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="role">
                    Role
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                    <select
                      id="role"
                      name="role"
                      value={formLogin.role}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="hr_admin">HR Administrator</option>
                    </select>
                  </div>
                </div> */}

            {/* <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot pwd?
                </a>
              </div> */}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] font-medium text-lg shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* <p className="mt-8 text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;