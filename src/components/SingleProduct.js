import { Link, NavLink } from "react-router-dom";
import axios_api from '../api/axios_api';
import RegistrationService from "./RegistrationService";
import { useEffect, useRef, useState  } from "react";

const SingleProduct = ({ product }) => {

  const { img_path, name, price } = product;
  const url = "/" + name;
  const [visibleRegistrationService, setVisibleRegistrationService] = useState(false);
  const baseUrl = window.location.origin;
  var final_img_path = baseUrl + "/images/" + img_path;
  // var final_img_path =  `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;
  // console.log(final_img_path);



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
  };

  return (
    // <div className="max-sm:w-screen single-product flex flex-col bg-gray-50 gap-3 shadow-md hover:shadow-xl hover:scale-105 duration-300 px-4 py-7 rounded-sm overflow-hidden">
    //   <div className="flex justify-center">
    //     {/* {dev &&
    //     <img
    //       className="w-72 h-48 object-contain hover:scale-110 duration-500"
    //       src={final_img_path}
    //       alt={name}
    //     />} */}
    //     {/* {!dev &&  */}
    //       <img
    //       className="w-72 h-48 object-contain hover:scale-110 duration-500"
    //       src={final_img_path}
    //       alt={name}/>
    //       {/* } */}
    //   </div>
    //   <Link
    //     to={url}
    //     state={product}
    //     className="hover:text-rose-500 duration-300 flex justify-between items-center"
    //   >
    //     <h2 className="text-stone-950 font-semibold text-xl capitalize max-h-16 leading-7 relative">
    //       {product.name}
    //     </h2>
    //   </Link>
    //   <div className="mt-auto">
    //   <p className="text-sm text-gray-600 mt-auto mb-3">
    //     Preț: <span className="text-rose-500 font-semibold">{price === "free" ? "Gratis" : price}</span>
    //   </p>
    //   <div className="flex justify-between items-center mt-auto">
    //     <NavLink
    //       to={url}
    //       state={product}
    //       className="hover:text-rose-50 text-gray-900 duration-300 flex justify-between items-center"
    //     >
    //       <button className="text-sky-400 px-2 py-1 border border-sky-400 rounded-md hover:bg-sky-400 hover:text-sky-50 duration-300">
    //         Mai multe informații
    //       </button>
    //     </NavLink>
    //     <button
    //       onClick={toggleRegistrationService}
    //       className="bg-sky-400 text-sky-50 hover:bg-sky-50 hover:text-sky-400 duration-300 border border-sky-400 px-2 py-1 rounded-md"
    //     >
    //       Participă
    //     </button>
    //   </div>
    //   </div>
    //   {visibleRegistrationService && <RegistrationService onClose={closeRegistrationService} service_id={product.service_id}
    //   service_name={name} service_price={price} service_image_path={img_path}></RegistrationService>}
    // // </div>
      <div className="bg-light-purple relative top-[0rem] rounded-lg shadow-[0px_4px_8px_rgba(0,_0,_0,_0.25)] w-[17.75rem] h-[23.5rem] overflow-hidden"
          style={{
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}>
        

        <Link to={url} state={product}>
        <div className="bg-white relative h-[18rem] w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between py-[1.5rem] px-[2rem] box-border">
          <img
            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={final_img_path}
          />
  
          <div className="max-lg:hidden absolute top-0 left-0" style={{ background: "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))", width: "23rem", height: "18rem" }} />
        
          {/* <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-start justify-end py-[1.5rem] max-lg:px-[1rem] lg:px-[1.5rem] box-border">
            <div className="relative tracking-[0.1em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[1.3rem]">
              {product.name}
            </div>
            <div className="self-stretch flex items-center justify-center pt-[0.5rem] pb-[0.5rem]">
              <div className="relative box-border max-lg:w-5/6 lg:w-[77.09rem] h-[0.09rem] border-t-[2px] border-solid border-text-fields-white-hf" />
            </div>
            <div className="relative tracking-[0.1em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[1.3rem]">
              Preț: <span>{price === "free" ? "Gratis" : price + " RON"}</span>
            </div>
          </div> */}
        </div>
        </Link>

          <div className="bg-light-purple">
            <div className="flex-1 flex flex-col py-[0.5rem] max-lg:px-[1rem] lg:px-[1rem] box-border">
                <Link to={url} state={product}>
                    <div className="self-stretch relative flex text-black tracking-[0.03em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[1rem]">
                      {product.name}
                    </div>
                </Link>

                <div className="self-stretch absolute bottom-2  flex text-gray-500 pt-[0.2rem] tracking-[0.03em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[0.8rem]">
                      {product.organiser}
                </div>
            </div>

            <div className="self-stretch absolute bottom-2 right-2 lg:px-[1rem] text-black tracking-[0.05em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[1rem] mt-auto">
              <span className="text-accent">{price === "free" ? "Gratis" : price + " Lei"}</span>
            </div>
          </div>
      </div>
    );
};

export default SingleProduct;
