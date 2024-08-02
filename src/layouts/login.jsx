import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { username, password }
      );
      setAuth({ token: response.data.token, username });
      localStorage.setItem(
        "auth",
        JSON.stringify({ token: response.data.token, username })
      );
      history("/");
    } catch (e) {
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center p-5 items-center bg-cover bg-center h-[100vh]">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/4 mx-auto p-5 border"
          method="POST"
        >
          <div className="flex justify-center">
            <img src={logo} className="h-16 me-3 sm:h-20" alt="" />
          </div>
          <p className="text-center mb-3 text-xl font-bold">Rumkit</p>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm text-gray-900 dark:text-white font-semibold"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}
          <p className="text-center text-red-500 mt-3">{error}</p>
        </form>
      </div>
    </>
  );
};

export default Login;
