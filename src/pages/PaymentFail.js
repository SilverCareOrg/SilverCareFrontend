import React from "react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="bg-red-500 rounded-full h-20 w-20 mx-auto flex items-center justify-center">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-red-600 mb-2">
          Plata a eșuat
        </h1>
        <p className="text-gray-700 text-base">
          Ne pare rău, dar plata dumneavoastră nu a putut fi procesată. Vă rugăm să verificați detaliile și încercați din nou.
        </p>
      </div>
    </div>
  );
};

export default PaymentFail;
