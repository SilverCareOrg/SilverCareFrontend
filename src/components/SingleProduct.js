import { Link, NavLink } from "react-router-dom";
import axios_api from "../api/axios_api";
import RegistrationService from "./RegistrationService";
import { useEffect, useRef, useState } from "react";

const SingleProduct = ({ product }) => {
  const { image_path, id } = product;
  const url = "/product/details/" + id;
  const [visibleRegistrationService, setVisibleRegistrationService] =
    useState(false);
  const baseUrl = window.location.origin;
  var final_image_path = baseUrl + "/images/" + image_path;
  // var final_image_path =  `${process.env.REACT_APP_SERVER_IMAGE_PATH}${image_path}`;

  console.log(product);

  const DisplayPriceText = () => {
    // If there are no options in the service as a key, return price
    if (!product.options) {
      return <span>{product.price} RON</span>;
    }

    var min = product.options[0].price;

    for (let i = 1; i < product.options.length; i++) {
      if (product.options[i].price < min) {
        min = product.options[i].price;
      }
    }

    if (min == "0") {
      return <span className="text-blue-500">Gratis</span>;
    } else if (product.options.length == 1) {
      return <span>{min} RON</span>;
    } else {
      return <span>De la {min} RON</span>;
    }
  };

  const toggleRegistrationService = () => {
    setVisibleRegistrationService((prevState) => !prevState);
  };

  const closeRegistrationService = () => {
    setVisibleRegistrationService(false);
  };

  return (
    <div
      className="bg-white relative top-[0rem] rounded-lg  max-lg:w-[18.5rem] lg:w-[17.75rem] h-[23.5rem] overflow-hidden border lg:border-gray-200 max-lg:border-gray-300"
      style={{
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0px 16px 32px rgba(0, 0, 0, 0.1)"; // Adjust the shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0)";
      }}
    >

      {!product.url &&
      <Link to={url} state={product}>
        <div className="bg-white relative h-[18rem]  lg:w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between lg:py-[1.5rem] lg:px-[2rem] box-border">
          <img
            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src={`data:image/jpeg;base64,${image_path[0]}`}
          />

          <div
            className="max-lg:hidden absolute top-0 left-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
              width: "23rem",
              height: "18rem",
            }}
          />
        </div>
      </Link>}

      {product.url &&
      <a href={product.url} target="_blank">
      <div className="bg-white relative h-[18rem]  lg:w-[99.91%] top-[0%] right-[0.09%] bottom-[0%] left-[0%] flex flex-col items-end justify-between lg:py-[1.5rem] lg:px-[2rem] box-border">
        <img
          className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src={`data:image/jpeg;base64,${image_path[0]}`}
        />

        <div
          className="max-lg:hidden absolute top-0 left-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))",
            width: "23rem",
            height: "18rem",
          }}
        />
      </div>
    </a>}

      <div className="">
        <div className="flex-1 flex flex-col py-[0.7rem] max-lg:px-[1rem] lg:px-[1rem] box-border">
          <Link to={url} state={product}>
            <div className="self-stretch relative flex text-black tracking-[0.03em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[1rem]">
              {product.name}
            </div>
          </Link>

          <div
            style={{ wordBreak: "break-all" }}
            className="lg:w-[8rem] max-lg:w-[13rem] self-stretch absolute bottom-4 flex text-gray-500 pt-[0.2rem] tracking-[0.03em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[0.8rem]"
          >
            {product.organiser}
          </div>
        </div>

        <div className="self-stretch absolute bottom-4 right-2 lg:px-[1rem] text-black tracking-[0.05em] leading-[110%] font-semibold max-lg:text-[1.1rem] lg:text-[1rem] mt-auto">
          <DisplayPriceText />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
