import React from "react";
import { Link, useParams } from "react-router-dom";

import ConfirmationBar from "../components/ConfirmationBar";

const PaymentSucess = () => {
  // order number from url
  const { cmd } = useParams();

  return (
    <>
      <ConfirmationBar orderNumber={cmd} isSuccesful={true} />
    </>
  );
};

export default PaymentSucess;
