import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios_api from '../axios_api';
import '../styles/styles.css';
import { useNavigate   } from 'react-router-dom';

function AdminAddService() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();

  const handleAddService = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { name, category, price, description } = document.forms[0];
    
  };

  // JSX code for login form
  const renderForm = (
    <div className="login-form">
      <form onSubmit={handleAddService}>
        <div className="admin-add-service-input-container">
          <label>Service Name </label>
          <input type="admin-add-service-name" name="name" required />
        </div><div className="admin-add-service-input-container">
          <label>Category </label>
          <input type="admin-add-service-category" name="category" required />
        </div>
        <div className="admin-add-service-input-container">
          <label>Price </label>
          <input type="admin-add-service-price" name="price" required />
        </div>
        <div className="admin-add-service-input-container">
          <label>Description </label>
          <input type="admin-add-service-description" name="description" required />
        </div>
        <div className="login-button-container" onClick={handleAddService}>
            <button>Create new service.</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">Add service</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default AdminAddService;