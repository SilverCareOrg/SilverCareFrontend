import React, { useState } from "react";
import ReactDOM from "react-dom";
import useAuthentication from "../api/permissions";
import axios_api from "../api/axios_api";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const navigate = useNavigate();
  const userRole = useAuthentication();

  const handleCreateArticle = async (event) => {
    event.preventDefault();

    navigate("/adminCreateArticle");
  };

  const handleUpdateArticle = async (event) => {
    event.preventDefault();

    navigate("/adminUpdateArticleTable");
  };

  const handleUpdateService = async (event) => {
    event.preventDefault();

    navigate("/adminUpdateService");
  };

  const handleUpdateJson = async (event) => {
    event.preventDefault();

    navigate("/adminUpdateJson");
  };

  const handleAddService = async (event) => {
    //Prevent page reload
    event.preventDefault();

    navigate("/adminAddService");
  };

  const handleAddLinkService = async (event) => {
    //Prevent page reload
    event.preventDefault();

    navigate("/adminAddLinkService");
  }

  const handleUpdateLinkService = async (event) => {
    //Prevent page reload
    event.preventDefault();

    navigate("/adminUpdateLinkService");
  }

  const handleDeleteService = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, pass } = document.forms[0];
    localStorage.removeItem("token");
    axios_api
      .post(
        "/login",
        {
          email: email.value,
          password: pass.value,
        },
        {
          sameSite: "none",
          withCredentials: true,
          headers: {
            // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
            "Content-Type": "application/json",
          },
        },
      )
      .then((response) => {
        // Handle the response
        if (response.status == 200) {
          setIsSubmitted(true);
          localStorage.setItem("token", response.data["access"]);
          localStorage.setItem("refresh", response.data["refresh"]);
          setRefreshToken(response.data["refresh"]);
        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  if (userRole === "admin" || userRole === "staff") {
    return (
      <div className="login">
        <div className="login-title">
          This is the admin page. Please choose one of the following actions.
        </div>
        <div className="login-button-container" onClick={handleAddLinkService}>
          <button>Add new link service.</button>
        </div>
        <div className="login-button-container" onClick={handleUpdateLinkService}>
          <button>Update link service table.</button>
        </div>
        <div className="login-button-container" onClick={handleAddService}>
          <button>Add new service.</button>
        </div>
        <div className="login-button-container" onClick={handleUpdateService}>
          <button>Update service table</button>
        </div>
        <div className="login-button-container" onClick={handleCreateArticle}>
          <button>Add new article</button>
        </div>
        <div className="login-button-container" onClick={handleUpdateArticle}>
          <button>Update article table</button>
        </div>
        <div className="login-button-container" onClick={handleDeleteService}>
          <button>Delete existing service.</button>
        </div>
        <div className="login-button-container" onClick={handleUpdateJson}>
          <button>Update service json.</button>
        </div>
      </div>
    );
  } else {
    return <div>Access Denied</div>;
  }
}

export default Admin;
