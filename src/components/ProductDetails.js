import { Link, useLocation } from "react-router-dom";
import '../styles/styles.css';
import axios_api from '../api/axios_api';
import { useEffect, useRef, useState  } from "react";
import RegistrationService from "./RegistrationService";

const ProductDetails = () => {
  const { state: product } = useLocation();
  const [visibleRegistrationService, setVisibleRegistrationService] = useState(false);
  const { img_path, name, description, category, rating, price, organiser } = product;

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
    <section className="flex flex-col gap-16 py-10 bg-gray-100">

      {/* Desktop view */}
      <div className="max-xl:hidden">
        <div className="container mx-auto flex justify-around  items-center w-[80%]">
          <div className="flex justify-end max-w-[500px] max-h-[500px]  mr-9">
            <img src="${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}" alt={name} className="max-w-[500px] max-h-[500px] select-none" />
          </div>
          <div className="relative absolute product-details-right-box transform translate-x-1/4 translate-y-1/6">
            <p className="text-gray-500">
              {"Home/"}
              {<Link to="/product">product</Link>}
              {`/${name}`}
            </p>
            <h2 className="text-4xl">{name}</h2>
            <span className="font-semibold">
            Preț: <span className="text-2xl text-green-500">{price === "free" ? "Gratis" : price}</span> {price === "free" ? "" : "Ron"}
            </span>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Descriere</h1>
              <p className="product-details-description">{description}</p>
            </div>
            <h3 className="flex justify-between text-gray-700 text-lg">
              <span>Categorie: {category}</span>
              <span>
                Rating:{" "}
                <span className="text-blue-500 font-bold">
                  {rating.toString().slice(0, 3)}
                </span>
                <span>{rating.toString().slice(3)}</span>
              </span>
            </h3>
            <button
              onClick={toggleRegistrationService}
              className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
            >
              Participă
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Link
            to="/product"
            className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
          >
            &larr; Întoarce-te la pagina de servicii
          </Link>
        </div>
      </div>
      {visibleRegistrationService && <RegistrationService onClose={closeRegistrationService} service_id={product.service_id}
      service_name={name} service_price={price} service_image_path={img_path}></RegistrationService>}
      {/* Mobile view */}
      <div className="xl:hidden flex-column w-screen overflow-x-hidden">
        <div className="mx-auto items-center">
          <div className="flex w-screen justify-center ">
            <img src={require(`../images/${img_path}`)} alt={name} className="object-cover w-full select-none" />
          </div>
          <div className="px-3 py-4">
            <h2 className="text-3xl font-semibold text-gray-500 text-center">{name}</h2>
            <div className="py-6 flex flex-col text-lg">
              <span className="font-semibold mb-2">
                Preț: <span className="text-green-500">{price}</span> Ron
              </span>
              <span className="font-semibold mb-2">Categorie: {category}</span>
              <span className="font-semibold">Organizator: {organiser}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl">Descriere</h1>
              <p className="w-full">{description}</p>
            </div>
            <h3 className="mt-7 flex justify-between text-gray-700 text-lg">
              <span>
                Rating:{" "}
                <span className="text-blue-500 font-bold">
                  {rating.toString().slice(0, 3)}
                </span>
                <span>{rating.toString().slice(3)}</span>
              </span>
            </h3>
            <button
              onClick={toggleRegistrationService}
              className="bg-sky-500 text-sky-50 px-2 py-3 mt-4 justify-center flex mx-auto w-[80%]"
            >
              Participă
            </button>
          </div>
        </div>
        <Link
          to="/product"
          className="flex justify-center mt-3 text-xl text-center hover:text-cyan-500 duration-300 select-none"
        >
          &larr; Întoarce-te la pagina de servicii
        </Link>
      </div>
    </section>
    
  );
};

export default ProductDetails;
