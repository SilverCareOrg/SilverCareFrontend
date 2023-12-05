export default function ProductsList({
  products,
  baseUrl,
  handleRemoveButton,
}) {
  var image_path;
  var dateArray, duration;
  var option;

  const monthNumberToAbbreviationMap = {
    1: "ian",
    2: "feb",
    3: "mar",
    4: "apr",
    5: "mai",
    6: "iun",
    7: "iul",
    8: "aug",
    9: "sep",
    10: "oct",
    11: "nov",
    12: "dec",
  };

  const ExtractOptionDate = ({ option }) => {
    if (option.date === "") return null;

    const dateString = option.date;
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    const dateArray =
      dateString === "" ? null : [day, month, year, hour, minutes];
    return dateArray;
  };

  const ConvertDurationToHoursAndMinutes = ({ durationString }) => {
    // Extract hours and minutes
    const hours = parseInt(durationString.match(/(\d+)H/)[1] || 0);
    const minutes = parseInt(durationString.match(/(\d+)M/)[1] || 0);

    // Format the duration
    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
  };

  return (
    <div>
      {products.map(
        (product, index) => (
          (option = product.option_details),
          (dateArray = ExtractOptionDate({ option })),
          // (duration =
          //   option.duration != ""
          //     ? ConvertDurationToHoursAndMinutes({
          //         durationString: option.duration,
          //       })
          //     : null),
          (image_path = baseUrl + product.service_image_path),
          (
            <div key={index}>
              <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] my-3">
                <img
                  className="relative rounded-lg w-[13.17rem] h-[13.13rem] object-cover"
                  alt=""
                  src={image_path}
                />
                <div className="flex-1 flex flex-col items-start justify-start py-[0rem] px-[1rem] gap-[0.1rem] w-full h-[13rem]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem] text-dark-navy">
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-bold text-[1.4rem] flex items-center h-[2rem]">
                      {product.service_name}
                    </div>
                    <b className="tracking-[0.15em] leading-[120%] text-[1.4rem] uppercase flex font-open-sans text-right items-end jusify-end h-[2rem]">
                      {product.price}RON
                    </b>
                  </div>
                  <div className="mt-2 self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                      Număr de rezervări: {product.number_of_participants}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                      {dateArray != null && (
                        <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                          <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] text-text-fields-grey-hf font-medium ">{`Data:  `}</div>
                            <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans font-normal flex items-center shrink-0">
                              {dateArray[0]}{" "}
                              {monthNumberToAbbreviationMap[dateArray[1]]}{" "}
                              {dateArray[2]}
                            </div>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] text-text-fields-grey-hf font-medium ">{`Ora: `}</div>
                            <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                              {dateArray[3]}:{dateArray[4]}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center ">
                      {option.city != "" && (
                        <div className="self-stretch relative tracking-[0.1em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                          Oraș:{" "}
                          <span className="ml-2 text-[1rem] font-open-sans font-normal">
                            {option.city}, {option.county}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start gap-[0.63rem]">
                    <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center">
                      {option.location != "" && (
                        <div className="self-stretch relative tracking-[0.05em] leading-[120%] text-text-fields-grey-hf font-medium  flex items-center shrink-0 text-[1rem]">
                          Locație:{" "}
                          <span className="ml-2 text-[1rem] font-open-sans font-normal">
                            {option.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-row items-end justify-end text-right">
                    <button
                      className="relative tracking-[0.08em] leading-[120%]"
                      onClick={() =>
                        handleRemoveButton(product.service_id, product.price)
                      }
                    >
                      ȘTERGE
                    </button>
                  </div>
                </div>
              </div>

              {/* <div className="mt-3 mb-3 self-stretch relative box-border h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />  */}
            </div>
          )
        )
      )}
    </div>
  );
}
