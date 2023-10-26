import { Link, useLocation } from "react-router-dom";
import '../styles/styles.css';
import axios_api from '../api/axios_api';
import { useEffect, useRef, useState  } from "react";
import RegistrationService from "./RegistrationService";

const ProductDetails = () => {
  const { state: product } = useLocation();
  const [visibleRegistrationService, setVisibleRegistrationService] = useState(false);
  const { img_path, name, description, category, rating, price, organiser } = product;
  var final_img_path = `${process.env.REACT_APP_SERVER_IMAGE_PATH}${img_path}`;

  const handleAddCart = async (event) => {
    //Prevent page reload
    event.preventDefault();

    axios_api.post("/add_to_cart", {
        service_id: product.service_id,
        senior_name: "senior1",
        adult_name: "adult1",
        phone_number: "1234567890",
        companion: "companion1",
        email: "user@user"
    }, {sameSite: 'none', withCredentials: true,
    headers: {
      // 'X-CSRFToken': csrfToken, // Set the CSRF token in the request headers
      'Content-Type': 'application/json'
  }})
      .then((response) => {
        // Handle the response
        if (response.status == 200) {
        } else {
          console.log("Failed to send login data to the API");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  const toggleRegistrationService = () => {
    setVisibleRegistrationService(prevState => !prevState);
  };

  const closeRegistrationService = () => {
    setVisibleRegistrationService(false);
    console.log("Function" + visibleRegistrationService)
  };

  return (
  //   <section className="flex flex-col gap-16 py-10 bg-gray-100">

  //     {/* Desktop view */}
  //     <div className="max-xl:hidden">
  //       <div className="container mx-auto flex justify-around  items-center w-[80%]">
  //         <div className="flex justify-end max-w-[500px] max-h-[500px]  mr-9">
  //           <img src={final_img_path} alt={name} className="max-w-[500px] max-h-[500px] select-none" />
  //         </div>
  //         <div className="relative absolute product-details-right-box transform translate-x-1/4 translate-y-1/6">
  //           <p className="text-gray-500">
  //             {"Home/"}
  //             {<Link to="/product">product</Link>}
  //             {`/${name}`}
  //           </p>
  //           <h2 className="text-4xl">{name}</h2>
  //           <span className="font-semibold">
  //           Preț: <span className="text-2xl text-green-500">{price === "free" ? "Gratis" : price}</span> {price === "free" ? "" : "Ron"}
  //           </span>
  //           <span className="font-semibold">Organizator: {organiser}</span>
  //           <div className="flex flex-col gap-3">
  //             <h1 className="text-2xl">Descriere</h1>
  //             <p className="product-details-description">{description}</p>
  //           </div>
  //           <h3 className="flex justify-between text-gray-700 text-lg">
  //             <span>Categorie: {category}</span>
  //             <span>
  //               Rating:{" "}
  //               <span className="text-blue-500 font-bold">
  //                 {rating.toString().slice(0, 3)}
  //               </span>
  //               <span>{rating.toString().slice(3)}</span>
  //             </span>
  //           </h3>
  //           <button
  //             onClick={toggleRegistrationService}
  //             className="bg-sky-500 text-sky-50 px-2 py-1 mt-4"
  //           >
  //             Participă
  //           </button>
  //         </div>
  //       </div>
  //       <div className="flex justify-center mt-10">
  //         <Link
  //           to="/product"
  //           className="text-xl py-1 text-center hover:text-cyan-500 duration-300 select-none"
  //         >
  //           &larr; Întoarce-te la pagina de servicii
  //         </Link>
  //       </div>
  //     </div>
  //     {visibleRegistrationService && <RegistrationService onClose={closeRegistrationService} service_id={product.service_id}
  //     service_name={name} service_price={price} service_image_path={img_path}></RegistrationService>}
  //     {/* Mobile view */}
  //     <div className="xl:hidden flex-column w-screen overflow-x-hidden">
  //       <div className="mx-auto items-center">
  //         <div className="flex w-screen justify-center ">
  //           <img src={final_img_path} alt={name} className="object-cover w-full select-none" />
  //         </div>
  //         <div className="px-3 py-4">
  //           <h2 className="text-3xl font-semibold text-gray-500 text-center">{name}</h2>
  //           <div className="py-6 flex flex-col text-lg">
  //             <span className="font-semibold mb-2">
  //               Preț: <span className="text-green-500">{price}</span> Ron
  //             </span>
  //             <span className="font-semibold mb-2">Categorie: {category}</span>
  //             <span className="font-semibold">Organizator: {organiser}</span>
  //           </div>
  //           <div className="flex flex-col gap-3">
  //             <h1 className="text-2xl">Descriere</h1>
  //             <p className="w-full">{description}</p>
  //           </div>
  //           <h3 className="mt-7 flex justify-between text-gray-700 text-lg">
  //             <span>
  //               Rating:{" "}
  //               <span className="text-blue-500 font-bold">
  //                 {rating.toString().slice(0, 3)}
  //               </span>
  //               <span>{rating.toString().slice(3)}</span>
  //             </span>
  //           </h3>
  //           <button
  //             onClick={toggleRegistrationService}
  //             className="bg-sky-500 text-sky-50 px-2 py-3 mt-4 justify-center flex mx-auto w-[80%]"
  //           >
  //             Participă
  //           </button>
  //         </div>
  //       </div>
  //       <Link
  //         to="/product"
  //         className="flex justify-center mt-3 text-xl text-center hover:text-cyan-500 duration-300 select-none"
  //       >
  //         &larr; Întoarce-te la pagina de servicii
  //       </Link>
  //     </div>
  //   </section>
  <div>
    <div className="self-stretch flex flex-col items-center justify-start">
            <div className="w-[80.5rem] flex flex-col items-center justify-center">
              <div className="self-stretch flex flex-row items-center justify-start gap-[1rem]">
                <img
                  className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
                  alt=""
                  src="/vector-3.svg"
                />
                <div className="flex flex-col items-center justify-center gap-[1.5rem]">
                  <img
                    className="relative rounded-lg w-[77rem] h-[33rem] object-cover"
                    alt=""
                    src="/image-91@2x.png"
                  />
                  <img
                    className="relative w-[7rem] h-[1rem]"
                    alt=""
                    src="/group-18357.svg"
                  />
                </div>
                <img
                  className="relative rounded-sm w-[0.83rem] h-[1.63rem]"
                  alt=""
                  src="/vector-2.svg"
                />
              </div>
            </div>
          </div>
  <div className="self-stretch flex flex-col items-center justify-start">
            <div className="w-[77rem] h-[4rem] flex flex-col items-center justify-center">
              <div className="self-stretch flex-1 flex flex-row items-center justify-center">
                <div className="flex-1 h-[4rem] flex flex-col items-start justify-center gap-[1rem]">
                  <div className="self-stretch relative tracking-[0.05em] leading-[120%] font-semibold flex items-center h-[2rem] shrink-0">
                    Masaj terapeutic
                  </div>
                  <div className="h-[0.75rem] flex flex-row items-start justify-start gap-[0.25rem]">
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                    <img
                      className="relative w-[0.75rem] h-[0.72rem]"
                      alt=""
                      src="/-icon-star1.svg"
                    />
                  </div>
                </div>
                <div className="w-[17.5rem] flex flex-col items-end justify-start gap-[1rem] text-[0.88rem] text-text-fields-grey-hf">
                  <div className="w-[17.5rem] flex flex-row items-center justify-start gap-[0.63rem]">
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase">{`ORGANIZATOR: `}</b>
                    <div className="flex-1 relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-dark-navy text-right">
                      CENTRUL EKA
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[1rem] text-[1rem] text-dark-navy">
                    <img
                      className="relative w-[1.13rem] h-[1.5rem]"
                      alt=""
                      src="/icon-location.svg"
                    />
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                      BUCURESTI
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start text-[1.5rem]">
            <div className="w-[77rem] flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center py-[0rem] pr-[0rem] pl-[4.5rem] gap-[4rem]">
                <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[2.5rem]">
                  <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[44rem] h-[9rem] shrink-0">
                    Masajul terapeutic este o practică a medicinei
                    complementare, menită să amelioreze şi să trateze durerile,
                    precum şi diversele probleme medicale pe care le-ai putea
                    avea. Fiecare sesiune de masaj terapeutic este personalizată
                    în funcţie de nevoile şi diagnosticul tău. Folosind tehnici
                    de mobilizare a ţesuturilor moi, masajul terapeutic are ca
                    scop relaxarea muşchilor, creşterea vascularizaţiei şi
                    îmbunătăţirea mobilităţii.
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[2rem]">
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1.5rem] shrink-0">
                      CE INCLUDE ?
                    </div>
                    <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium text-text-fields-grey-hf flex items-center w-[43.94rem] h-[4.5rem] shrink-0">
                      Alături de specialiştii de la Eka, vei avea parte de toată
                      îngrijirea necesară pentru a rezolva diverse afecţiuni ale
                      corpului tău, de la dureri de spate până la probleme
                      circulatorii. Rezervă acum o sesiune de masaj terapeutic!
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[2rem]">
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1.5rem] shrink-0">
                      DETALII IMPORTANTE
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start gap-[1rem] text-[1rem]">
                      <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[39.5rem] h-[1rem] shrink-0">
                        <span className="[line-break:anywhere] w-full">
                          <span>{`Coordonatori: `}</span>
                          <span className="text-text-fields-grey-hf">{`Alex Hrisca & Adelina Csolti`}</span>
                          <span>{` `}</span>
                        </span>
                      </div>
                      <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[42.69rem] h-[1rem] shrink-0">
                        Masaj parțial – 1 hr | 195 RON
                      </div>
                      <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[42.75rem] h-[1rem] shrink-0">
                        Masaj general – 2 hr | 330 RON
                      </div>
                    </div>
                  </div>
                  <div className="relative box-border w-[46.19rem] h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />
                  <div className="flex flex-col items-start justify-center gap-[2rem]">
                    <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1rem] shrink-0">
                      FORMULAR REZERVARE
                    </div>
                    <div className="w-[44.19rem] flex flex-col items-start justify-start gap-[2rem] text-[0.88rem] text-text-fields-grey-hf">
                      <b className="self-stretch relative tracking-[0.15em] leading-[120%] uppercase flex items-center h-[1rem] shrink-0">
                        SELECTEAZA COORDONATORUL
                      </b>
                      <div className="self-stretch flex flex-row items-start justify-start gap-[14.63rem] text-center text-[1rem] text-dark-navy">
                        <div className="w-[9.25rem] flex flex-col items-center justify-start gap-[1.5rem]">
                          <img
                            className="relative rounded-[50%] w-[6rem] h-[6rem] object-cover"
                            alt=""
                            src="/img@2x.png"
                          />
                          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                            ALEX HRISCA
                          </div>
                        </div>
                        <div className="flex flex-col items-center justify-start gap-[1.5rem]">
                          <img
                            className="relative w-[6rem] h-[6rem] object-cover"
                            alt=""
                            src="/img1@2x.png"
                          />
                          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">
                            ADELINA CSOLTI
                          </div>
                        </div>
                      </div>
                      <b className="relative tracking-[0.15em] leading-[120%] uppercase flex items-center w-[44.19rem] h-[1rem] shrink-0">
                        aLEGE VARIANTA DORITA
                      </b>
                      <div className="w-[34.68rem] flex flex-col items-start justify-start py-[0rem] px-[1.5rem] box-border gap-[1rem] text-[1rem]">
                        <div className="flex flex-row items-center justify-start gap-[1rem]">
                          <div className="relative rounded-[50%] box-border w-[1.5rem] h-[1.5rem] border-[2px] border-solid border-text-fields-grey-hf" />
                          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[24.28rem] h-[1rem] shrink-0">
                            Masaj parțial – 1 hr | 195 RON
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[1rem]">
                          <div className="relative rounded-[50%] box-border w-[1.5rem] h-[1.5rem] border-[2px] border-solid border-text-fields-grey-hf" />
                          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[24.31rem] h-[1rem] shrink-0">
                            Masaj general – 2 hr | 330 RON
                          </div>
                        </div>
                      </div>
                      <b className="self-stretch relative tracking-[0.15em] leading-[120%] uppercase flex items-center h-[0.92rem] shrink-0">
                        PROGRAMEAZA
                      </b>
                      <div className="self-stretch rounded-lg bg-whitesmoke shadow-[0px_2px_8px_rgba(0,_0,_0,_0.25)] flex flex-col items-center justify-start p-[2rem] gap-[2rem] text-center text-[1rem] font-open-sans">
                        <div className="w-[39.88rem] flex flex-col items-start justify-start gap-[1rem]">
                          <div className="self-stretch flex flex-row items-center justify-center text-dark-navy font-h3">
                            <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center h-[1rem]">
                              Septembrie 2023
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between text-dark-navy font-h3">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[2.5rem] h-[1.5rem] shrink-0">
                              lun
                            </div>
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[3rem] shrink-0">
                              mar.
                            </div>
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[3rem] shrink-0">
                              mie.
                            </div>
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[3rem] shrink-0">
                              joi
                            </div>
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[3rem] shrink-0">
                              vin.
                            </div>
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[3rem] shrink-0">
                              sam.
                            </div>
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center justify-center w-[3rem] shrink-0">
                              dum.
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                28
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                29
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                30
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                31
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                1
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                2
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                3
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                4
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                5
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                6
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                7
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                8
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                9
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                10
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                11
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                12
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                13
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                14
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                15
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                16
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                17
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                18
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                19
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                20
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                21
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                22
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                23
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                24
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                25
                              </div>
                            </div>
                            <div className="rounded-lg bg-white box-border w-[3.25rem] flex flex-row items-start justify-between text-dark-navy border-[2px] border-solid border-tomato">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                26
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                27
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                28
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                29
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                30
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                1
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-between">
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                2
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                3
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                4
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                5
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                6
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                7
                              </div>
                            </div>
                            <div className="rounded-lg bg-white w-[3rem] flex flex-row items-start justify-between">
                              <div className="relative tracking-[0.05em] leading-[1.5rem] flex items-center justify-center w-[3rem] h-[1.5rem] shrink-0">
                                8
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[1rem] text-left text-dark-navy font-h3">
                          <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[40.19rem] h-[1rem] shrink-0">
                            Alege ora pentru 26 septembrie
                          </div>
                          <div className="self-stretch flex flex-row items-start justify-start gap-[2rem] text-center text-text-fields-grey-hf font-open-sans">
                            <div className="flex flex-col items-start justify-start gap-[1rem]">
                              <div className="self-stretch rounded-lg bg-white flex flex-row items-start justify-start py-[0rem] px-[1rem]">
                                <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem]">
                                  9 am-10 am
                                </div>
                              </div>
                              <div className="rounded-lg bg-white w-[8.63rem] flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border">
                                <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem]">
                                  10 am-11 am
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-start justify-start gap-[1rem] text-dark-navy">
                              <div className="self-stretch rounded-lg bg-white flex flex-row items-start justify-start py-[0rem] px-[1rem] border-[2px] border-solid border-tomato">
                                <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem]">
                                  11am-12 am
                                </div>
                              </div>
                              <div className="rounded-lg bg-white w-[8.63rem] flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border text-text-fields-grey-hf">
                                <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem]">
                                  12 am-13 am
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-start justify-start">
                              <div className="self-stretch rounded-lg bg-white flex flex-row items-start justify-start py-[0rem] px-[1rem]">
                                <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem]">
                                  13 am-14 am
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative box-border w-[46.19rem] h-[0.06rem] border-t-[1px] border-solid border-text-fields-grey-hf" />
                </div>
                <div className="self-stretch flex flex-row items-start justify-start">
                  <div className="rounded-lg bg-light-purple w-[24.25rem] h-[30rem] flex flex-col items-start justify-between py-[3.5rem] px-[2rem] box-border">
                    <div className="self-stretch flex flex-col items-start justify-center gap-[3rem]">
                      <div className="w-[20.25rem] flex flex-col items-start justify-start gap-[1rem]">
                        <div className="self-stretch relative tracking-[0.1em] leading-[120%] font-semibold flex items-center h-[1.5rem] shrink-0">{`Masaj terapeutic `}</div>
                        <div className="self-stretch flex flex-row items-start justify-start gap-[1rem] text-[1rem]">
                          <div className="flex flex-row items-start justify-start gap-[0.25rem]">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Data:  `}</div>
                            <div className="self-stretch relative text-[0.88rem] tracking-[0.08em] leading-[120%] font-open-sans flex items-center w-[3.13rem] shrink-0">{`26 sep `}</div>
                          </div>
                          <div className="flex flex-row items-center justify-center gap-[0.25rem]">
                            <div className="relative tracking-[0.05em] leading-[1.5rem] font-medium">{`Ora: `}</div>
                            <div className="relative tracking-[0.08em] leading-[120%] font-open-sans">
                              11:00am
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch h-[5.13rem] flex flex-col items-start justify-center gap-[1rem] text-[1rem]">
                        <div className="flex-1 relative tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[15rem]">
                          Numar de participanti
                        </div>
                        <div className="self-stretch rounded bg-white box-border h-[3rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] gap-[1rem] text-text-fields-grey-hf border-[1px] border-solid border-dark-navy">
                          <div className="flex-1 relative tracking-[0.08em] leading-[120%] flex items-center h-[2rem]">
                            o persoana
                          </div>
                          <img
                            className="relative w-[1.5rem] h-[0.91rem]"
                            alt=""
                            src="/-icon-chevrondown.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                      <div className="self-stretch flex flex-row items-center justify-start gap-[1.5rem]">
                        <div className="relative tracking-[0.1em] leading-[120%] font-semibold">{`Pret : `}</div>
                        <div className="flex-1 relative tracking-[0.1em] leading-[120%] font-semibold font-open-sans flex items-center h-[2rem]">
                          195RON
                        </div>
                      </div>
                      <div
                        className="self-stretch flex flex-col items-start justify-start cursor-pointer text-center text-[0.88rem] text-white"
                        // onClick={openFrame}
                      >
                        <div className="self-stretch rounded bg-tomato h-[2.25rem] flex flex-row items-center justify-start py-[0rem] px-[1rem] box-border">
                          <b className="flex-1 relative tracking-[0.15em] leading-[120%] uppercase flex items-center justify-center h-[2.25rem]">
                            ADAUGA IN COS
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center justify-start text-[1.5rem]">
            <div className="w-[77rem] flex flex-row items-center justify-center">
              <div className="flex-1 flex flex-row items-center justify-center py-[0rem] pr-[0rem] pl-[4.5rem] gap-[4rem]">
                <div className="w-[44.13rem] flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="relative tracking-[0.1em] leading-[120%] font-semibold flex items-center w-[39.5rem] h-[1.5rem] shrink-0">
                    LOCATIE
                  </div>
                  <img
                    className="relative w-[44.13rem] h-[25.31rem] object-cover"
                    alt=""
                    src="/img2@2x.png"
                  />
                  <div className="relative text-[1rem] tracking-[0.05em] leading-[1.5rem] font-medium flex items-center w-[43.94rem] h-[1rem] shrink-0">
                    str. Horatiu 28, Bucuresti 010834
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start py-[3rem] px-[0rem] gap-[1rem] text-[1rem] text-gray">
                  <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold text-dark-navy flex items-center w-[22.46rem] h-[1.5rem] shrink-0">
                    ORAR
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">
                      LUNI
                    </div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">
                      MARTI
                    </div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">{`MIERCURI   `}</div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                  <div className="flex flex-row items-start justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">
                      JOI
                    </div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">
                      VINERI
                    </div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">
                      SAMBATA
                    </div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                  <div className="flex flex-row items-center justify-start gap-[2.5rem]">
                    <div className="relative tracking-[0.05em] leading-[1.5rem] font-extrabold flex items-center w-[6.88rem] h-[1.5rem] shrink-0">
                      DUMINICA
                    </div>
                    <b className="relative tracking-[0.15em] leading-[120%] uppercase font-open-sans text-dark-navy">
                      08:00 - 22:00
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

  );

};

export default ProductDetails;
