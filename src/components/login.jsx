import React, { useState } from "react";
import Thumbnail from "../../assets/3.jpg";
import { CiMail, CiLock } from "react-icons/ci";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // No authentication, just UI
    console.log("Form submitted:", { email, password });
  };

const login = () => {
  return (
    <div
      style={{ backgroundImage: `url(${Thumbnail})` }}
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
    >
      <div className="bg-purewhite border border-accent rounded-lg m-2 p-4">
        <h2 className="text-center font-bold text-xl">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="m-2 p-2 flex flex-col space-y-5 sm:w-96"
        >
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <div className="flex relative">
            <CiMail className="absolute text-2xl block left-2 top-1/2 transform -translate-y-1/2" />
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              name="email"
              id="email"
              className="border sm:w-96 p-2 pl-10"
              placeholder="Enter your email..."
              required
            />
          </div>

          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <div className="flex relative">
            <CiLock className="absolute text-2xl block left-2 top-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              name="password"
              id="password"
              className="border sm:w-96 p-2 pl-10"
              placeholder="Enter your password..."
              required
            />
          </div>

          <button
            type="submit"
            className="bg-accent hover:bg-fourth text-white p-2 m-2"
          >
            Submit
          </button>
        </form>

        <div className="flex flex-col justify-center items-center">
          <div className="flex space-x-4">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <button className="underline underline-offset-2 font-bold text-accent">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login
