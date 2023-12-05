import DottedLine from "./DottedLine";

const ProgressBar = ({ cartStep }) => {
  const baseBubbleText = "text-[1.5rem]";
  const baseBubble =
    "rounded-[5rem] bg-white w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center";

  const selectedBubbleText = "text-[1.5rem] text-white";
  const selectedBubble =
    "rounded-[5rem] bg-dark-navy w-[2.75rem] h-[2.75rem] md:w-[3.5rem] md:h-[3.5rem] flex flex-col items-center justify-center";

  return (
    <div className="self-stretch bg-light-purple h-[9rem] flex flex-col items-center justify-start text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-[0.25rem]">
            <div className={selectedBubble}>
              <div className={selectedBubbleText}>1</div>
            </div>
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
              Coș
            </div>
          </div>
          <DottedLine lineStep={cartStep} index={1} />
          <div className="flex flex-col items-center justify-center gap-[0.25rem]">
            <div className={cartStep !== "1" ? selectedBubble : baseBubble}>
              <div
                className={
                  cartStep !== "1" ? selectedBubbleText : baseBubbleText
                }
              >
                2
              </div>
            </div>
            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
              Detalii
            </div>
          </div>
          <DottedLine lineStep={cartStep} index={2} />
          <div className="flex flex-col items-center justify-center gap-[0.25rem]">
            <div className={cartStep === "3" ? selectedBubble : baseBubble}>
              <div
                className={
                  cartStep === "3" ? selectedBubbleText : baseBubbleText
                }
              >
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
