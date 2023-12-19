import React from "react";
import checkmark from "../styles/icons/checkmark.svg";

function ConfirmationBar({ orderNumber }) {
  return (
    <div className=" bg-light-purple h-[9rem] flex  items-center justify-center ">
      <div className="ml-4 w-[3.5rem] h-[3.5rem]  md:w-[6.5rem] md:h-[6.5rem] md:p-4 p-2 bg-white overflow-hidden rounded-full flex items-center justify-center mr-4">
        <img alt="rounded-full" src={checkmark} />
      </div>
      <div className="flex md:flex-col md:gap-[0.75rem] w-2/3 md:w-auto">
        <div className=" tracking-[0.05em] leading-[1.5rem] font-medium ">
          Comanda nr {orderNumber} a fost inregistrata cu succes!
        </div>
        <div className="hidden md:block tracking-[0.05em] leading-[1.5rem] font-medium">
          In cel mai scurt timp, vei primi un mail de la noi cu toate detaliile
          comenzii.
        </div>
      </div>
    </div>
  );
}

export default ConfirmationBar;
