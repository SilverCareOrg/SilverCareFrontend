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

    axios.post("http://localhost:8000/login", {
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
          <input className="h-6 px-4 border border-gray-300" type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="login-button-container" onClick={handleSubmit}>
            <button>Conectare</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="max-md:transform max-md:translate-y-1/8 max-md:pl-2 max-md:pr-2 login">
      <div className="login-form">
        <div className="login-title">Autentificare</div>
        {errorMessages.name === "cooldown" && renderErrorMessage("cooldown")}
        {showSuccessMessage ? <div>V-ați autentificat cu succes!</div> : null}
        {(isSubmitted && showSuccessMessage) ? <div/>:
        errorMessages.name === "cooldown" ? <div/> : renderForm}
      </div>
        <div className="text-center login-text-for-signup">
            <p className="max-md:flex max-md:flex-col">Nu ți-ai creat un cont încă? <span className="login-signup-link">
              
                <Link to="/signup">Apasă aici pentru întregistrare</Link>
                </span></p>
        </div>
    </div>
  );
}

export default Login;