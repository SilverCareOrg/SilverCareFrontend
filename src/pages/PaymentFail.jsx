import React from "react";
import { Link } from "react-router-dom";
import ConfirmationBar from "../components/ConfirmationBar";

const PaymentFail = () => {
  return (
    <>
      <ConfirmationBar orderNumber={"abcABC"} isSuccesful={false} />
    </>
  );
};

export default PaymentFail;
