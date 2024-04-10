import React, { useState, useEffect, useRef } from "react";
import axios_api from "../api/axios_api";
import "../styles/styles.css";

function AdminAddLinkService() {
  const categories = [
    "Spiritualitate",
    "Excursii",
    "Sănătate",
    "Sport",
    "Divertisment",
    "Artă",
    "Cursuri de limbi străine",
    "Hobby",
  ];

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    city: "",
    category: "",
    url: "",
    organiser: "",
    price: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(e);
  };


  const handleAddService = async (event) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();

    // Append all fields from formData
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // Append the image
    formDataToSubmit.append("image", selectedImage);

    axios_api
      .post("/create_link_service/", formDataToSubmit, {
        withCredentials: true,
        headers: {
          //   'X-CSRFToken': `${localStorage.getItem('csrftoken')}`, // Set the CSRF token in the request headers
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":
            "multipart/form-data;  boundary=----WebKitFormBoundaryEXAMPLE",
        },
      })
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border border-opacity-400 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Add a New Service</h1>
      <form onSubmit={handleAddService}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organiser" className="block font-semibold">
            Organiser
          </label>
          <input
            type="text"
            id="organiser"
            name="organiser"
            value={formData.organiser}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="block font-semibold">
            URL
          </label>
          <input
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>


        <div className="mb-4">
        <label htmlFor="city" className="block font-semibold">
            City
        </label>
        <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
        />
        </div>

        <div className="mb-4">
        <label htmlFor="price" className="block font-semibold">
            Price
        </label>
        <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
        />
        </div>

        <div className="mt-4 mb-4">
          <label htmlFor="imageUpload" className="block font-semibold">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="btn-submit bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
        >
          Create New Service
        </button>
      </form>
      {/* {isSubmitted && <div className="text-green-600 mt-4">Service has been successfully added!</div>} */}
    </div>
  );
}

export default AdminAddLinkService;
