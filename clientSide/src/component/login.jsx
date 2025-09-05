import React from "react";
import { CiMail, CiLock } from "react-icons/ci";
import { Link,useNavigate } from "react-router-dom";
import Thumbnail from "../assets/3.jpg";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/courses');
  }
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${Thumbnail})` }}
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      >

        <div className="bg-white/30 backdrop-blur-lg border-2  m-2 p-6 w-full max-w-md shadow-lg rounded-2xl border-green-700 h-110">
          <h2 className="text-center font-bold text-2xl mt-5 mb-6 text-green-900 drop-shadow-lg">
            Login
          </h2>

          <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="font-bold block mb-1 text-green-900"
              >
                Email:
              </label>
              <div className="flex relative">
                <CiMail className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-green-800" />
                <input
                  type="email"
                  id="email"
                  className="bg-white/20 border font-medium border-white/50 w-full p-2 pl-10 rounded font-bold text-green-900 placeholder-green-800 focus:outline-none focus:ring-2 focus:ring-green-700"
                  placeholder="Enter your email..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="font-bold block mb-1 text-green-900"
              >
                Password:
              </label>
              <div className="flex relative">
                <CiLock className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-green-800" />
                <input
                  type="password"
                  id="password"
                  className="bg-white/20 border font-medium border-white/50 w-full p-2 pl-10 rounded font-bold text-green-900 placeholder-green-800 focus:outline-none focus:ring-2 focus:ring-green-700"
                  placeholder="Enter your password..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white p-2 rounded shadow-lg"
            >
              Submit
            </button>
          </form>

          <div className="flex justify-center items-center mt-4 space-x-2">
            <p className="text-green-900 mt-3">Don't have an account?</p>
            <Link to="/signup" className="mt-3 text-green-800 font-bold underline">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
