import DottedLine from "./DottedLine";

const ProgressBar = ({ progressBarIndex }) => {
  const bgDark =
    "rounded-[5rem] bg-dark-navy w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center";
  const bgWhite =
    "rounded-[5rem] bg-white w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center";

  const textWhite = "text-[1.5rem] text-white";
  const textDark = "text-[1.5rem]";

  return (
    <div className="self-stretch bg-light-purple h-[9rem] flex flex-col items-center justify-start text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-[0.25rem]">
            <div className={progressBarIndex >= 1 ? bgDark : bgWhite}>
              <div className={progressBarIndex >= 1 ? textWhite : textDark}>
                1
              </div>
            </div>
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
              Coș
            </div>
          </div>
          <DottedLine dottedIndex={1} progressIndex={progressBarIndex} />
          <div className="flex flex-col items-center justify-center gap-[0.25rem]">
            <div className={progressBarIndex >= 2 ? bgDark : bgWhite}>
              <div className={progressBarIndex >= 2 ? textWhite : textDark}>
                2
              </div>
            </div>
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
              Detalii
            </div>
          </div>
          <DottedLine dottedIndex={2} progressIndex={progressBarIndex} />
          <div className="flex flex-col items-center justify-center gap-[0.25rem]">
            <div className={progressBarIndex >= 3 ? bgDark : bgWhite}>
              <div className={progressBarIndex >= 3 ? textWhite : textDark}>
                3
              </div>
            </div>
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
              Plată
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
