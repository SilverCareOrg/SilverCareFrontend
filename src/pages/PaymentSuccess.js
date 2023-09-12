import React from "react";
import { Link } from "react-router-dom";

const PaymentSucess = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="bg-green-500 rounded-full h-20 w-20 mx-auto flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-white h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-green-600 mb-2">
          Plată realizată cu succes!
        </h1>
        <p className="text-gray-700 text-base">
          Am reușit să procesăm detaliile comenzii dumneavoastră. În curând veți primi un email cu aceste informații. Vă mulțumim!
        </p>
      </div>
    </div>
  );
};

export default PaymentSucess;
