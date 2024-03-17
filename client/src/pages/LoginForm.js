import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import gym from "../images/gym.jpg";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri"; // Import eye icons from react-icons library
import { toast } from "react-toastify"; // Import toast module from react-toastify
import "react-toastify/dist/ReactToastify.css";

import Auth from "../utils/auth";

const Login = () => {

  useEffect(() => {
    document.title = "Login Account - FitNRun"
  }, [])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to track whether to show password or not
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (e) {
      toast.error("Invalid credentials. Please try again."); // Display error message using React Toastify
    }

    // clear form values
    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="loginPage" style={{ backgroundImage: `url(${gym})` }}>
      <div className="col-12 col-lg-10">
        <div className="loginContainer card">
          <h4 className="loginHeader card-header">Login</h4>
          <div className="card-body">
            {data ? (
              <Link to="/"></Link>
            ) : (
              <form className="loginForm" onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* Show/hide password button */}
                  {showPassword ? (
                    <RiEyeCloseLine
                      className="password-icon"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <RiEyeLine
                      className="password-icon"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
                <button
                  className="loginBtn"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
