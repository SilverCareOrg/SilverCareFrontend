import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios_api from '../api/axios_api';
import '../styles/styles.css';
import { useNavigate   } from 'react-router-dom';

function AdminAddService() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();
  const FormData = require('form-data');

  const handleAddService = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const formData = new FormData();
    var { name, category, price, description, organiser } = document.forms[0];
    formData.append("name", name.value);
    formData.append('category', category.value);
    formData.append('price', price.value);
    formData.append('description', description.value);
    formData.append('organiser', organiser.value);

    var imagefile = document.querySelector('#upload-input');
    formData.append("file", imagefile.files[0]);
    console.log(Array.from(formData.entries()));

    axios_api.post("/create_service/",
       formData
    , {withCredentials: true,
    headers: {
    //   'X-CSRFToken': `${localStorage.getItem('csrftoken')}`, // Set the CSRF token in the request headers
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data;  boundary=----WebKitFormBoundaryEXAMPLE'
  }})
      .then((response) => {
        // Handle the response
        if (response.status == 200) {
          setIsSubmitted(true);
        //   navigate("/admin")
        } else {
          console.log("Failed to create service.");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  const handleImageUpload = async (event) => {
    // Handle image upload logic
    const file = event.target.files[0];
    setSelectedImage(file);
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
        <div className="admin-add-service-input-container">
          <label>Organiser </label>
          <input type="admin-add-service-category" name="organiser" required />
        </div>
        <div className="image-upload-container" name="file" required>
            <label>Upload image </label>
      <input
        type="file"
        id="upload-input"
        accept="image/*"
        onChange={handleImageUpload}
      />
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
        {isSubmitted ? <div>Service has been successfully added!</div> : renderForm}
      </div>
    </div>
  );
}

export default AdminAddService;