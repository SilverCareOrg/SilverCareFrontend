import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios_api from '../axios_api';
import '../styles/styles.css';

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    email: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, pass } = document.forms[0];
    localStorage.removeItem("token");
    axios_api.post("http://127.0.0.1:8000/login", {
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
          <input type="login-text" name="email" required />
          {renderErrorMessage("email")}
        </div>
        <div className="login-input-container">
          <label>Password </label>
          <input type="login-password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="login-button-container" onClick={handleSubmit}>
            <button>Sign in</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
        <div className="login-text-for-signup">
            <p>Does not have an account yet? <span className="login-signup-link">Click here to Sign up</span></p>
        </div>
    </div>
  );
}

export default Login;