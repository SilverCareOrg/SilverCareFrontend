import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios_api from '../api/axios_api';
import '../styles/styles.css';
import { Link, NavLink } from "react-router-dom";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');

  const errors = {
    email: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, pass } = document.forms[0];
    localStorage.removeItem("token");
    axios_api.post("/login", {
        email: email.value,
        password: pass.value
    }, {sameSite: 'none', withCredentials: true,
    headers: {
      // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
      'Content-Type': 'application/json'
  }})
      .then((response) => {
        // Handle the response
        if (response.status == 200) {
          setIsSubmitted(true);
          const csrfToken = response.headers['csrftoken'];
          console.log(csrfToken);
          localStorage.setItem("token", response.data['access']);
          localStorage.setItem("refresh", response.data['refresh']);
          setRefreshToken(response.data['refresh']);
        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="login-error">{errorMessages.message}</div>
    );

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
        {isSubmitted ? <div>V-ați autentificat cu succes!</div> : renderForm}
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