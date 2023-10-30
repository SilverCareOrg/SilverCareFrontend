import React, { useState, useEffect, useRef  } from "react";
import axios_api from '../api/axios_api';
import useAuthentication from '../api/permissions';
import '../styles/styles.css';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';
import marker_icon_png from '../images/marker_icon.png';

function AdminAddService() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    // ... Other fields from the Service model
    has_more_options: false,
    options_common_city: false,
    common_location: false,
    location: '',
    map_location: '',
    city: '',
    details: '',
  });
  const [options, setOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const userRole = useAuthentication();
  const [mapLocation, setMapLocation] = useState([44.43, 27.34]); // Default location
  const [markerPosition, setMarkerPosition] = useState([44.43, 26.09]); // Default marker position

  const markerIcon = new L.Icon({
    iconUrl: marker_icon_png,
    iconRetinaUrl: marker_icon_png,
    popupAnchor:  [-0, -0],
    iconSize: [25,25],     
});

  // Function to update the map location when the user selects a location
  const handleMapLocationChange = (e) => {
    setMapLocation([e.latlng.lat, e.latlng.lng]);
    setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    console.log(e.latlng.lat, e.latlng.lng);
    setFormData({ ...formData, map_location: `${e.latlng.lat}, ${e.latlng.lng}` });
  };
  
  const handleMarkerClick = (e) => {
    // When the user clicks on the map, update the marker's position
    setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    console.log(e.latlng.lat, e.latlng.lng);
  };

  function MapEventsHandler({ handleMarkerClick }) {
    useMapEvents({
      click: handleMarkerClick,
    });
  
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddServiceOption = () => {
    const newOption = {
      name: "",
      price: 0,
      duration: "",
      date: "",
      location: "",
      map_location: "",
      rating: 0,
      number_ratings: 0,
    };
    setOptions([...options, newOption]);
  };

  const handleOptionChange = (index, name, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][name] = value;
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleAddService = async (event) => {
    event.preventDefault();

    const formDataToSubmit = {
      ...formData,
      // Other fields from the Service model
      details: JSON.stringify(options), // Convert options array to JSON
    };

    axios_api.post("/create_service/", formDataToSubmit, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setIsSubmitted(true);
        } else {
          console.log("Failed to create service.");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
    <h1 className="text-2xl font-semibold mb-4">Add a New Service</h1>
    <form onSubmit={handleAddService}>
      <div className="mb-4">
        <label htmlFor="name" className="block font-semibold">Service Name</label>
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
        <label htmlFor="organiser" className="block font-semibold">Organiser</label>
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
        <label htmlFor="description" className="block font-semibold">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="4"
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="mb-4 relative  flex flex-row">
        <label className="block font-semibold">
          Options Share a Common Location
          <input
            type="checkbox"
            id="common_location"
            name="common_location"
            checked={formData.common_location}
            onChange={handleInputChange}
            className="w-5 h-4 ml-2 mr-2"
          />
        </label>
        <div className="relative group">
        <div
            className={`info-icon-container bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer `}
          >
            <span className="info-icon text-white font-semibold">i</span>
          </div>
          <div className="flex flex-1 w-[15rem] bg-blue-500 text-white text-[0.8rem] hidden group-hover:block absolute z-10 bg-white shadow-md p-2 mt-2 rounded-lg">
            <p>If there are more options that may differ with price or coordinator etc., but the activities are taking place at the same location, check this box.</p>
          </div>
        </div>
      </div>

      {formData.common_location && <div className="mb-4">
          <label htmlFor="location" className="block font-semibold">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>}

      {formData.common_location && <div className="mb-4">
          <label htmlFor="map_location" className="block font-semibold text-[1.2rem]">Map Location<span className="text-[1rem]"> - Please select the location on the map</span></label>
          <div className="w-full h-80 border rounded-md">
            <MapContainer
              center={mapLocation}
              zoom={5}
              style={{ height: "100%" }}
              onClick={handleMapLocationChange}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={markerPosition} icon={markerIcon}>
                <Popup>Selected Location</Popup>
              </Marker>

              <MapEventsHandler handleMarkerClick={handleMarkerClick} />
            </MapContainer>
          </div>
        </div>}
      

      {/* ... Add more fields and checkboxes for Service model attributes ... */}
      
      {/* Options Section */}
      {formData.has_more_options && (
        <div className="border p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Service Options</h2>
          <button
            type="button"
            onClick={handleAddServiceOption}
            className="btn-add-option"
          >
            Add Option
          </button>
          {options.map((option, index) => (
            <div key={index} className="mb-2 p-2 border rounded-md">
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="btn-remove-option"
              >
                Remove
              </button>
              <div className="mb-2">
                <label htmlFor={`optionName${index}`} className="block font-semibold">Option Name</label>
                <input
                  type="text"
                  id={`optionName${index}`}
                  name="name"
                  value={option.name}
                  onChange={(e) => handleOptionChange(index, "name", e.target.value)}
                  required
                  className="w-full border rounded-md p-2"
                />
              </div>
              {/* Add more input fields for other ServiceOption model attributes */}
            </div>
          ))}
        </div>
      )}

      {/* ... More input fields for other Service model attributes ... */}
      
      <div className="mb-4">
        <label htmlFor="imageUpload" className="block font-semibold">Upload Image</label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded-md p-2"
        />
      </div>

      <button type="submit" className="btn-submit">Create New Service</button>
    </form>
    {isSubmitted && <div className="text-green-600 mt-4">Service has been successfully added!</div>}
  </div>
  );
}

export default AdminAddService;
