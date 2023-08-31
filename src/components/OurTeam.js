import poza_stefan from "../images/poza_stefan_avram.jpg";
import poza_teo from "../images/poza_teofil_sturzoiu.jpg";
import poza_antonia_nicoara from "../images/poza_antonia_nicoara.jpg";
import poza_bianca_scirtocea from "../images/poza_bianca_scirtocea.jpg";
import poza_teodora_minea from "../images/poza_teodora_minea.jpg";
import poza_tibi from "../images/poza_tibi.jpg";
import poza_irina_vadan from "../images/poza_irina_vadan.jpg";
import poza_madalina_hamciuc from "../images/poza_madalina_hamciuc.jpg";
import poza_melisa_staicu from "../images/poza_melisa_staicu.jpg";
import poza_adrian_sandu from "../images/poza_adrian_sandu.jpg";

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Ioan-Teofil Sturzoiu",
      designation: "Co-Founder & CEO",
      img: poza_teo,
    },
    {
      name: "Cristian-Ștefan Avram",
      designation: "Co-Founder & CTO",
      img: poza_stefan,
    },
    {
      name: "Antonia Nicoară",
      designation: "Strategic Partnerships & Social Media Coordinator",
      img: poza_antonia_nicoara,
    },
    {
      name: "Bianca Scîrtocea",
      designation: "Strategic Partnerships",
      img: poza_bianca_scirtocea,
    },
    {
      name: "Teodora Minea",
      designation: "Strategic Partnerships",
      img: poza_teodora_minea,
    },
    {
      name: "Tiberiu Vrîncianu",
      designation: "Strategic Partnerships",
      img: poza_tibi,
    },
    {
      name: "Melisa Staicu",
      designation: "Strategic Partnerships",
      img: poza_melisa_staicu,
    },
    {
      name: "Irina Vădan",
      designation: "UI/UX Designer",
      img: poza_irina_vadan,
    },
    {
      name: "Mădălina Hamciuc",
      designation: "UI/UX Designer",
      img: poza_madalina_hamciuc,
    },
    {
      name: "Adrian Sandu",
      designation: "UI/UX Designer",
      img: poza_adrian_sandu,
    }
  ];

  return (
    <section className="bg-white py-20 ">

      {/* Desktop view */}
      <div className="max-lg:hidden w-[60%] mx-auto">
        <div className="flex flex-col gap-3 justify-center items-center w-[50%] mx-auto text-center">
          <h2 className="text-5xl text-gray-700 font-semibold ">Echipa Noastră</h2>
          <p className="text-gray-700 text-lg">
            Suntem o echipă tânără, pasionată de tehnologie și dornică de a schimba lumea în bine.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 py-20">
          {teamMembers.map((member, index) => {
            return (
              <div key={index} className="flex flex-col gap-5 justify-center items-center bg-gray-100 py-10 px-0">
                <div className="max-w-64 max-h-80">
                  <img src={member.img} alt={member.name} className="object-contain max-w-full max-h-full rounded-full"/>
                </div>
                <div className="text-center flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold text-gray-700">
                    {member.name}
                  </h1>
                  <h3 className="text-gray-700  text-lg">
                    {member.designation}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile view */}
      <div className="lg:hidden  mx-auto">
        <div className="flex flex-col gap-3 justify-center items-center mx-auto text-center px-5">
          <h2 className="text-center flex text-4xl text-gray-700 font-semibold ">Echipa Noastră</h2>
          <p className="text-gray-700 text-lg">
            Suntem o echipă tânără, pasionată de tehnologie și dornică de a schimba lumea în bine.
          </p>
        </div>
        <div className="grid grid-rows-2 gap-10 py-20 pl-5 pr-5">
          {teamMembers.map((member, index) => {
            return (
              <div key={index} className="flex flex-col gap-5 justify-center items-center bg-gray-100 py-10 px-0">
                <div className="max-w-64 max-h-80">
                  <img src={member.img} alt={member.name} className="object-contain max-w-full max-h-full rounded-full"/>
                </div>
                <div className="text-center flex flex-col gap-2">
                  <h1 className="text-3xl font-semibold text-gray-700">
                    {member.name}
                  </h1>
                  <h3 className="text-gray-700  text-lg">
                    {member.designation}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  
    </section>
  );
};

export default OurTeam;
