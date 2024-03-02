import React from "react";
import TermeniSiConditii from "../docs/TermeniSiConditii.pdf"
const TermsAndConditions = () => {
  return (
    <div className="flex justify-center items-center pt-12">
      <iframe src={TermeniSiConditii} height="1500" frameborder="0" width="1200" />
    </div>
  );
}

export default TermsAndConditions;
