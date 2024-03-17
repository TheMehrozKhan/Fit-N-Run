import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import backSignup from '../images/backSignup.png';
import Auth from '../utils/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri'; // Import eye icons from react-icons library

const Signup = () => {
  useEffect(() => {
    document.title = "Register Account - FitNRun"
  }, [])

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirm password field
    showPassword: false
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setFormState({
      ...formState,
      showPassword: !formState.showPassword
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Additional validations
      if (formState.username.length < 6) {
        toast.error('Username must be at least 6 characters long.');
        return;
      }
  
      if (!validateEmail(formState.email)) {
        toast.error('Invalid email format.');
        return;
      }

      if (formState.password !== formState.confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }
  
      if (!validatePassword(formState.password)) {
        toast.error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
        return;
      }
  
      const { data } = await addUser({
        variables: { ...formState }
      });
  
      Auth.login(data.addUser.token);
    } catch (e) {
      if (e.message.includes('E11000 duplicate key error collection: FitnRun.users index: username_1')) {
        toast.error('Username is already taken.');
      } else {
        toast.error(e.message);
      }
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
    <title>My Site: Contact Us</title>
    <main className="signupPage" style={{ backgroundImage: `url(${backSignup})` }}>
      <div className="col-12 col-lg-10">
        <div className="signupContainer card">
          <h4 className="signupHeader">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <Link to="/"></Link>
            ) : (
              <form className="signupForm" onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                  required 
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required 
                />
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    className="form-input"
                    placeholder="Password"
                    name="password"
                    type={formState.showPassword ? "text" : "password"}
                    value={formState.password}
                    onChange={handleChange}
                    required 
                  />
                  {formState.showPassword ? (
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
                <input
                  className="form-input"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  required 
                />
                <button
                  className="signupBtn"
                  style={{ cursor: 'pointer' }}
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
    </>
  );
};

export default Signup;
