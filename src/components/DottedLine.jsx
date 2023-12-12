import React from "react";

function DottedLine({ dottedIndex, progressIndex }) {
  const noProgress =
    "box-border w-[4rem] sm:w-[8rem] md:w-[12rem] lg:w-[18rem] xl:w-[25rem] z-[0] border-t-[2px] border-dashed border-white";
  const yesProgress =
    "box-border w-[4rem] sm:w-[8rem] md:w-[12rem] lg:w-[18rem] xl:w-[25rem] z-[0] border-t-[2px] border-dashed border-dark-navy";

  return (
    <div className="self-stretch flex flex-row items-center justify-center pl-[0.5rem] pr-[0.5rem] relative mb-7">
      <div
        className={dottedIndex > progressIndex - 1 ? noProgress : yesProgress}
      />
    </div>
  );
}

export default DottedLine;
