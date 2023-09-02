import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios_api from '../api/axios_api';
import '../styles/styles.css';
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate   } from 'react-router-dom';

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const errors = {
    email: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var axiosConfig = {
      sameSite: 'none',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var { email, pass } = document.forms[0];
    var token = localStorage.getItem("token");
    
    if (token !== null) {
      axiosConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    axios_api.post("/login", {
        email: email.value,
        password: pass.value
    }, axiosConfig)
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          setIsSubmitted(true);
          const csrfToken = response.headers['csrftoken'];

          if (token !== null) {
            localStorage.removeItem("token");
          }

          localStorage.setItem("token", response.data['access']);
          localStorage.setItem("refresh", response.data['refresh']);
          setRefreshToken(response.data['refresh']);

          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/");
            window.location.reload();
          }, 2000);

        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {

        if (error.response && error.response.status === 429) { 
          setIsSubmitted(false); 
          setErrorMessages({
            name: "cooldown",
            message: "Ai încercat să te conectezi de prea multe ori. Vei putea încerca din nou în 2 minute."
          });

          // After 2 minutes, reset the error message and enable the form again
          setTimeout(() => {
            setErrorMessages({});
      }, 2 * 60 * 1000);
      }});
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) => {
    if (name === errorMessages.name) {
      if (name === "cooldown") {
        return (
          <div className="login-error text-base text-darkorange bg-fef2d2 p-2 rounded mt-2">
            {errorMessages.message}
          </div>
        );
      } else {
        return (
          <div className="login-error">
            {errors[errorMessages.name]}
          </div>
        );
      }
    }
    return null;
  };

  // JSX code for login form
  const renderForm = (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <label>Email </label>
          <input  type="login-text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="login-input-container">
          <label>Parolă </label>
          <input  type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="login-button-container" onClick={handleSubmit}>
            <button>Conectare</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="bg-white rounded-lg shadow-xl">
          <div className="px-6 py-8">
            <div className="text-2xl text-center text-gray-800 login-title">Autentificare</div>
            {errorMessages.name === "cooldown" && renderErrorMessage("cooldown")}
            {showSuccessMessage ? <div className="text-center">V-ați autentificat cu succes!</div> : null}
            {(isSubmitted && showSuccessMessage) ? <div/>:
            errorMessages.name === "cooldown" ? <div/> : renderForm}
          </div>
          
          <div className="px-6 py-4 text-center">
            <p className="text-sm text-gray-600 max-md:flex max-md:flex-col">
              Nu ți-ai creat un cont încă?{" "}
              <span className="text-green-500">
                <Link to="/signup">Apasă aici pentru înregistrare</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;