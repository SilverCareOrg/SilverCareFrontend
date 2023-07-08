import poza_stefan from "../images/poza_stefan.png";
import poza_teo from "../images/poza_teo.png";

const OurTeam = () => {
  const teamMenbers = [
    {
      name: "Ioan-Teofil Sturzoiu",
      designation: "Co-Founder - CEO",
      img: poza_teo,
    },
    {
      name: "Cristian-Ștefan Avram",
      designation: "Co-Founder - CTO",
      img: poza_stefan,
    },
  ];

  return (
    <section className="bg-white py-20 ">
      <div className="w-[60%] mx-auto">
        <div className="flex flex-col gap-3 justify-center items-center w-[50%] mx-auto text-center">
          <h2 className="text-5xl text-gray-700 font-semibold ">Echipa Noastră</h2>
          <p className="text-gray-700 text-lg">
            Suntem o echipă tânără, pasionată de tehnologie și dornică de a schimba lumea în bine.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 py-20">
          {teamMenbers.map((member) => {
            return (
              <div className="flex flex-col gap-5 justify-center items-center bg-gray-100 py-10 px-0">
                <div>
                  <img src={member.img} alt={member.name} />
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
