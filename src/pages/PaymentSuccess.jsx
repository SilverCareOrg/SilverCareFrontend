import React from "react";
import { Link } from "react-router-dom";

import ConfirmationBar from "../components/ConfirmationBar";

const PaymentSucess = () => {
  return (
    <>
      <ConfirmationBar orderNumber={"abcABC"} isSuccesful={true} />
    </>
  );
};

export default PaymentSucess;
