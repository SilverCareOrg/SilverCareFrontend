import { Link } from "react-router-dom";
import axios_api from '../api/axios_api';
import RegistrationService from "./RegistrationService";
import { useEffect, useRef, useState  } from "react";

const SingleProduct = ({ product }) => {

  const { img_path, name, price } = product;
  const [visibleRegistrationService, setVisibleRegistrationService] = useState(false);
  var dev;
  var final_img_path =  `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;

  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   dev = false;
  // } else {
  //   dev = true;
  //   final_img_path = `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;
  // }

  const handleAddCart = async (event) => {
    //Prevent page reload
    event.preventDefault();

    axios_api.post("/add_to_cart", {
        service_id: product.service_id,
        senior_name: "senior1",
        adult_name: "adult1",
        phone_number: "1234567890",
        companion: "companion1",
        email: "user@user"
    }, {sameSite: 'none', withCredentials: true,
    headers: {
      // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
      'Content-Type': 'application/json'
  }})
      .then((response) => {
        // Handle the response
        if (response.status == 200) {
        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  const toggleRegistrationService = () => {
    setVisibleRegistrationService(prevState => !prevState);
  };

  const closeRegistrationService = () => {
    setVisibleRegistrationService(false);
    console.log("Function" + visibleRegistrationService)
  };

  return (
    <div className="max-sm:w-screen single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
      <div className="flex justify-center">
        {/* {dev &&
        <img
          className="w-72 h-48 object-contain hover:scale-110 duration-500"
          src={final_img_path}
          alt={name}
        />} */}
        {/* {!dev &&  */}
          <img
          className="w-72 h-48 object-contain hover:scale-110 duration-500"
          src={final_img_path}
          alt={name}/>
          {/* } */}
      </div>
      <Link
        to={name}
        state={product}
        className="hover:text-rose-500 duration-300 flex justify-between items-center"
      >
        <h2 className="text-stone-950 font-semibold text-xl capitalize">
          {product.name}
        </h2>
      </Link>
      <p className="text-sm text-gray-600">
        Preț: <span className="text-rose-500 font-semibold">{price === "free" ? "Gratis" : price}</span>
      </p>
      <div className="flex justify-between items-center">
        <Link
          to={name}
          state={product}
          className="hover:text-rose-50 text-gray-900 duration-300 flex justify-between items-center"
        >
          <button className="text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
            Mai multe informații
          </button>
        </Link>
        <button
          onClick={toggleRegistrationService}
          className="bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md"
        >
          Participă
        </button>
      </div>
      {visibleRegistrationService && <RegistrationService onClose={closeRegistrationService} service_id={product.service_id}
      service_name={name} service_price={price} service_image_path={img_path}></RegistrationService>}
    </div>
  );
};

export default SingleProduct;
