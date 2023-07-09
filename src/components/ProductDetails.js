import { Link, useLocation } from "react-router-dom";
import '../styles/styles.css';
import axios_api from '../axios_api';

const ProductDetails = () => {
  const { state: product } = useLocation();

  const { img_path, name, description, category, rating, price } = product;

  const handleAddCart = async (event) => {
    //Prevent page reload
    event.preventDefault();

    axios_api.post("http://127.0.0.1:8000/add_to_cart", {
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

  return (
    <section className="flex flex-col gap-16 py-10 bg-gray-100">
      <div className="container mx-auto flex justify-around  items-center w-[80%]">
        <div className="product-details-image">
          <img src={require(`../images/${img_path}`)} alt={name} className="w-full select-none" />
        </div>
        <div className="product-details-right-box">
          <p className="text-gray-500">
            {"Home/"}
            {<Link to="/product">product</Link>}
            {`/${name}`}
          </p>
          <h2 className="text-4xl">{name}</h2>
          <span className="font-semibold">
            Price: <span className="text-2xl">{price}</span>
          </span>
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl">Description</h1>
            <p className="product-details-description">{description}</p>
          </div>
          <h3 className="flex justify-between text-gray-700 text-lg">
            <span>Category: {category}</span>
            <span>
              Rating:{" "}
              <span className="text-rose-500 font-bold">
                {rating.toString().slice(0, 3)}
              </span>
              <span>{rating.toString().slice(3)}</span>
            </span>
          </h3>
          <button
            onClick={handleAddCart}
            className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
          >
            Participă
          </button>
        </div>
      </div>
      <Link
        to="/product"
        className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
      >
        &larr; Go to Product
      </Link>
    </section>
  );
};

export default ProductDetails;
