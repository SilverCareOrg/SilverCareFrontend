import React, { useState } from "react";
import axios_api from '../api/axios_api';
import '../styles/styles.css';
import { Link } from "react-router-dom";
import homepage_photo_4 from "../images/homepage-photo-4.jpg";
import homepage_photo_3 from "../images/homepage-photo-3.jpg";
import homepage_photo_2 from "../images/homepage-photo-2.jpg";
import homepage_photo_1 from "../images/homepage-photo-1.jpg";
import { useNavigate   } from 'react-router-dom';

function Signup() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const sliderImages = [
    homepage_photo_2,
    homepage_photo_3,
    homepage_photo_4,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length);
  };

  const errors = {
    email: "invalid email",
    pass: "invalid password",
    username: "invalid username"
  };

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    var axiosConfig = {
      sameSite: 'none',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var token = localStorage.getItem("token");

    if (token !== null) {
      axiosConfig.headers['Authorization'] = `Bearer ${token}`;
    }

    axios_api.post("/signup", {
      email: email,
      username: username,
      password: password
    }, axiosConfig)
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          setIsSubmitted(true);
          const csrfToken = response.headers['csrftoken'];

          if (token !== null) {
            localStorage.removeItem("token");
          }

          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            navigate("/");
            window.location.reload();
          }, 1000);
        } else {
          console.log("Failed to send signup data to the API");
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

  // JSX code for signup form
  const renderForm = (
    <div className="max-lg:mt-[5rem] max-lg:mb-[5rem] lg:min-h-screen flex items-center justify-center">
      <div className="w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center text-black">Înregistrare</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 border border-black rounded-md focus:outline-none input-style"
              type="email"
              id="email"
              placeholder="Introdu adresa de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="username">
              Nume utilizator
            </label>
            <input
              className="w-full p-3 border border-black rounded-md focus:outline-none input-style"
              type="text"
              id="username"
              placeholder="Introdu numele de utilizator"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">
              Parolă
            </label>
            <input
              className="w-full p-3 border border-black rounded-md focus:outline-none input-style"
              type="password"
              id="password"
              placeholder="Introdu parola"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="login-button-link w-full py-3 px-4 rounded-md"
            type="submit"
          >
            Înregistrare
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-4 text-center">
          Ai deja un cont?{' '}
          <span className="text-blue-500">
            <Link to="/login">Autentifică-te aici</Link>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row lg:min-h-screen overflow-hidden">
      {/* Left side with signup form (40% width on large screens) */}
      <div className="md:w-2/5 p-4 md:p-8 bg-gray-100">
        <div className="max-w-md mx-auto">
          {isSubmitted ? <div className="text-center"></div> : renderForm}
        </div>
      </div>

        {/* Right side with image and text (60% width on large screens) */}
      <div className="md:w-3/5 relative overflow-hidden">
        {/* Background image container */}
        <div
          className="bg-cover bg-center h-full relative"
          style={{
            backgroundImage: `url(${sliderImages[currentSlide]})`,
            backgroundSize: "cover",
          }}
        >
          {/* Image slider */}
          <div className="relative w-full h-full">
            {sliderImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className={`absolute w-full h-full object-cover transition-opacity brightness-50 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute bottom-4 right-4 flex space-x-4 z-20">
              <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-transparent border border-white cursor-pointer hover:bg-gray-300 transition duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-transparent border border-white cursor-pointer hover:bg-gray-300 transition duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
                        
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pr-20 pl-20 z-10 mt-96" style={{ pointerEvents: showSuccessMessage ? 'none' : 'auto' }}>
            <p className="text-2xl">Conectează-te și trăiește viața din plin. Noi îți putem oferi toate experiențele de care ai nevoie pentru a face asta!</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
