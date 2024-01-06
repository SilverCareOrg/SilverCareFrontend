import React from "react";
import checkmark from "../styles/icons/checkmark.svg";
import xmark from "../styles/icons/x_icon.svg";

function ConfirmationBar({ orderNumber, isSuccesful }) {
  return (
    <div className=" bg-light-purple h-[9rem] flex items-center justify-center gap-8 mr-0">
      <div className="ml-4 w-[3.5rem] h-[3.5rem]  md:w-[6.5rem] md:h-[6.5rem] md:p-4 p-2 bg-white overflow-hidden rounded-full flex items-center justify-center mr-4">
        <img
          alt=""
          className={isSuccesful ? "p-0" : "p-2"}
          src={isSuccesful ? checkmark : xmark}
        />
      </div>
      <div className="flex md:flex-col md:gap-[0.75rem] w-2/3 md:w-auto mr-2">
        <div className=" tracking-[0.05em] leading-[1.5rem] font-medium ">
          {isSuccesful
            ? "Comanda nr " +
              orderNumber.toString() +
              " a fost inregistrata cu succes!"
            : "Comanda nu a fost inregistrata cu succes."}
        </div>
        <div className="hidden md:block tracking-[0.05em] leading-[1.5rem] font-medium">
          {isSuccesful
            ? "In cel mai scurt timp, vei primi un mail de la noi cu toate detaliile comenzii."
            : "Incercati din nou."}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationBar;
