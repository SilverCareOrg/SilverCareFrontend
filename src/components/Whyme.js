import {
  FaPeopleGroup,
  FaShapes
} from "react-icons/fa6";

import {
  AiFillSafetyCertificate
} from "react-icons/ai";

const Whyme = () => {
  return (
    <section className=" bg-gray-100 pb-20">
      {/* Desktop */}
      <div className="max-md:hidden">
      <div className="container mx-auto flex flex-col gap-5">
        <h2 className="text-4xl py-14 text-center font-semibold text-gray-700">
          De ce ai alege SilverCare?
        </h2>
        <div className="grid grid-cols-3 gap-10 justify-between">
          <div className="text-center  flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <AiFillSafetyCertificate className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl text-gray-900 font-semibold">
              Siguranță
            </h1>
            <p className="text-gray-700 text-lg">
              Seniorii beneficiază de servicii sigure și de încredere.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <FaPeopleGroup className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold">Comunitate</h1>
            <p className="text-gray-700 text-lg">
              Avem convingerea că împreună putem crea o comunitate mai unită, unde seniorii pot cunoaște oameni cu pasiuni comune.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <FaShapes className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold">Varietate</h1>
            <p className="text-gray-700 text-lg">
              Suntem motivați să oferim o gamă cât mai largă de servicii.
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
      <div className="container mx-auto flex flex-col gap-5">
        <h2 className="text-4xl py-14 text-center font-semibold text-gray-700">
          De ce ai alege SilverCare?
        </h2>
        <div className="grid grid-rows-3 gap-10 justify-between">
          <div className="text-center  flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <AiFillSafetyCertificate className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl text-gray-900 font-semibold">
              Siguranță
            </h1>
            <p className="text-gray-700 text-lg">
              Seniorii beneficiază de servicii sigure și de încredere.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <FaPeopleGroup className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold">Comunitate</h1>
            <p className="text-gray-700 text-lg">
              Avem convingerea că împreună putem crea o comunitate mai unită, unde seniorii pot cunoaște oameni cu pasiuni comune.
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-200 py-10 px-4">
            <div className="flex justify-center">
              <FaShapes className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold">Varietate</h1>
            <p className="text-gray-700 text-lg">
              Suntem motivați să oferim o gamă cât mai largă de servicii.
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Whyme;
