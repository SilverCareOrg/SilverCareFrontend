import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios_api from '../api/axios_api';
import '../styles/styles.css';
import { Link, NavLink } from "react-router-dom";

function Signup() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');

  const errors = {
    email: "invalid email",
    pass: "invalid password",
    username: "invalid username"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, username, pass } = document.forms[0];
    localStorage.removeItem("token");
    axios_api.post("/signup", {
        email: email.value,
        username: username.value,
        password: pass.value
    }, {sameSite: 'none', withCredentials: true,
    headers: {
      // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
      'Content-Type': 'application/json'
  }})
      .then((response) => {
        // Handle the response
        console.log(response);
        if (response.status === 200) {
            console.log("eu is aici ai");
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
          <input type="login-text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="login-input-container">
          <label>Nume utilizator </label>
          <input type="login-text" name="username" required />
          {renderErrorMessage("username")}
        </div>
        <div className="login-input-container">
          <label>Parolă </label>
          <input className="h-6 px-4 border border-gray-300" type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="login-button-container" onClick={handleSubmit}>
            <button>Înregistrare</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">Înregistrare</div>
        {isSubmitted ? <div>Cont creat cu success!</div> : renderForm}
      </div>
    </div>
  );
}

export default Signup;