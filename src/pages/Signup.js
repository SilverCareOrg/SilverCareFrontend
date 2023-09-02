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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     <div className="w-full max-w-md p-4">
       <div className="bg-white rounded-lg shadow-xl">
         <div className="px-6 py-8">
           <div className="text-2xl text-center text-gray-800 login-title">Înregistrare</div>
           {isSubmitted ? <div className="text-center">Cont creat cu success!</div> : renderForm}
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

export default Signup;