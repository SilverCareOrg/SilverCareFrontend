import React, { useState } from "react";
import ReactDOM from "react-dom";

import '../styles/styles.css';

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
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
          <label>Username </label>
          <input type="login-text" name="uname" required />
          {renderErrorMessage("uname")}
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