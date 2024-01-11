import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios_api from "../api/axios_api";
import useAuthentication from "../api/permissions";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import marker_icon_png from "../images/marker_icon.png";

function AdminUpdateServiceProduct() {
  const initialQuestions = [
    "Ce include?",
    "Ce presupune?",
    "Ce face?",
    "De ce ai alege aceasta experienta?",
    "Beneficiile alegerii acestei experiente",
  ];
  const categories = [
    "Spiritualitate",
    "Excursii",
    "Sănătate",
    "Sport",
    "Divertisment",
    "Artă",
    "Cursuri de limbi străine",
    "Hobby",
  ];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    // ... Other fields from the Service model
    has_more_options: false,
    options_common_city: false,
    common_location: false,
    location: "",
    map_location: "",
    city: "",
    county: "",
    category: "",
    iban: "",
  });

  const id = useParams();
  const [updatingServiceId, setUpdatingServiceId] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const userRole = useAuthentication();
  const [mapLocation, setMapLocation] = useState([44.43, 27.34]); // Default location
  const [formMarkerPosition, setFormMarkerPosition] = useState([44.43, 26.09]); // Default marker position for form data
  const [optionMarkerPositions, setOptionMarkerPositions] = useState([]); // Default marker position
  const [sections, setSections] = useState(initialQuestions);
  const [sectionText, setSectionText] = useState({});
  const [selectedSection, setSelectedSection] = useState("");
  const [products, setProducts] = useState([]);
  const [currentService, setCurrentService] = useState(null);

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const get_all_services = () => {
    const url = `/get_service_by_id?id=${id.id}`;
    try {
      axios_api
        .get(url, {
          params: {
            // for category iterate through selectCategories and choose the name with the same raw
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            const currentService = json.service[0][0];

            for (let i = 0; i< currentService.options.length; i++)
            {
              handleAddServiceOption(currentService.options[i]);
            }

            for (let i = 0; i< currentService.sections.length; i++)
            {
              handleSectionsInit(currentService.sections[i]);
            }

            setFormData(() => ({
              name: currentService?.name,
              organiser: currentService?.organiser,
              category: currentService?.category,
              description: currentService?.description,
              iban: currentService?.iban,
              city: currentService?.city,
              common_location: currentService?.common_location,
              county: currentService?.county,
              options_common_city: currentService?.options_common_city,
              img_path: currentService?.img_path,
              image: currentService?.image,
              map_location: currentService?.map_location,
              has_more_options: currentService?.has_more_options,
              location: currentService?.location,
            }));
          }
          
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {}
  };

  useEffect(() => {
    get_all_services();
  }, []);

  const handleSectionsInit = (section) => {
    var existingSections = sectionText;
    console.log(existingSections);
    console.log(section);
    existingSections[section.question] = section.answer;

    setSectionText(existingSections);
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    if (!sectionText[section]) {
      setSectionText({
        ...sectionText,
        [section]: "",
      });
    }
  };

  const handleSectionRemove = (section) => {
    const updatedSectionText = { ...sectionText };
    delete updatedSectionText[section];
    setSectionText(updatedSectionText);
    setSelectedSection("");
  };

  const handleTextChange = (section, text) => {
    setSectionText({
      ...sectionText,
      [section]: text,
    });
  };

  const markerIcon = new L.Icon({
    iconUrl: marker_icon_png,
    iconRetinaUrl: marker_icon_png,
    popupAnchor: [-0, -0],
    iconSize: [25, 25],
  });

  // Function to update the map location when the user selects a location
  const handleMapLocationChange = (e) => {
    setMapLocation([e.latlng.lat, e.latlng.lng]);
    setFormMarkerPosition([e.latlng.lat, e.latlng.lng]);
    setFormData({
      ...formData,
      map_location: `${e.latlng.lat}, ${e.latlng.lng}`,
    });
  };

  const handleMarkerClick = (e) => {
    setFormMarkerPosition([e.latlng.lat, e.latlng.lng]);
    setFormData({
      ...formData,
      map_location: `${e.latlng.lat}, ${e.latlng.lng}`,
    });
  };

  function MapEventsHandler({ handleMarkerClick }) {
    useMapEvents({
      click: handleMarkerClick,
    });

    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(e);
  };

  async function handleDisplayService(id) {
    //updatingServiceId = id; pass this to the put call
    setUpdatingServiceId(id);
    setCurrentService(products[id - 1]);
    console.log(currentService?.sections.length);
    currentService?.options.forEach((optionObject) => {
      handleAddServiceOption(optionObject);
    });
    for (let i = 0; i < currentService?.sections.length; i++) {
      handleSectionSelect(currentService?.sections[i].question);
      console.log(currentService?.sections[i].question);
      console.log(currentService?.sections[i].answer);
      handleTextChange(
        currentService?.sections[i].question,
        currentService?.sections[i].answer,
      );
    }
    console.log(currentService);
    setFormData((prevData) => ({
      ...prevData,
      name: currentService?.name,
      organiser: currentService?.organiser,
      category: currentService?.category,
      description: currentService?.description,
      iban: currentService?.iban,
      city: currentService?.city,
      common_location: currentService?.common_location,
      county: currentService?.county,
      options_common_city: currentService?.options_common_city,
      img_path: currentService?.img_path,
      image: currentService?.image,
      map_location: currentService?.map_location,
      options: currentService?.options,
      has_more_options: currentService?.has_more_options,
      location: currentService?.location,
    }));
  }

  const handleAddServiceOption = (option) => {
    const newOption = {
      name: option?.name,
      price: option?.price,
      duration: option?.duration,
      date: option?.date,
      location: option?.location,
      map_location: option?.map_location,
      details: option?.details,
      option_has_location: option?.option_has_location,
      city: option?.city,
      county: option?.county,
    };
    var existingOptions = options;
    existingOptions.push(newOption);
    setOptions(existingOptions);
  };

  const handleOptionMarkerClick = (e, index) => {
    // Create a copy of the existing marker positions for options
    const updatedOptionMarkerPositions = [...optionMarkerPositions];
    updatedOptionMarkerPositions[index] = [e.latlng.lat, e.latlng.lng];
    setOptionMarkerPositions(updatedOptionMarkerPositions);

    // Update the general marker position for the form data to match the last clicked option's position
    setFormMarkerPosition([e.latlng.lat, e.latlng.lng]);

    // Update the map_location field in the specific option's data
    const updatedOptions = [...options];
    updatedOptions[index].map_location = `${e.latlng.lat}, ${e.latlng.lng}`;
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index, name, value) => {
    if (name === "date_time") {
      // Parse the date string into a JavaScript Date object
      const selectedDate = new Date(value);

      // Adjust the date to the desired timezone (Bucharest)
      const bucharestTimezoneOffset = -120; // Bucharest timezone offset in minutes (UTC+2)
      selectedDate.setMinutes(
        selectedDate.getMinutes() - bucharestTimezoneOffset,
      );

      // Format the date with the timezone offset
      const formattedDate = selectedDate.toISOString().slice(0, 16);

      const updatedOptions = [...options];
      updatedOptions[index][name] = formattedDate;
      setOptions(updatedOptions);
    } else {
      const updatedOptions = [...options];
      updatedOptions[index][name] = value;
      setOptions(updatedOptions);
    }
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleAddService = async (event) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();

    // Append all fields from formData
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // Append the image
    formDataToSubmit.append("image", selectedImage);

    // Append other fields
    formDataToSubmit.append("options", JSON.stringify(options));

    const sect = [];
    Object.keys(sectionText).forEach((section) => {
      sect.push({ question: section, answer: sectionText[section] });
    });
    formDataToSubmit.append("sections", JSON.stringify({ sections: sect }));
    console.log(formDataToSubmit);
    console.log(formData);
    // axios_api
    //   .post("/create_service/", formDataToSubmit, {
    //     withCredentials: true,
    //     headers: {
    //       //   'X-CSRFToken': `${localStorage.getItem('csrftoken')}`, // Set the CSRF token in the request headers
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type":
    //         "multipart/form-data;  boundary=----WebKitFormBoundaryEXAMPLE",
    //     },
    //   })
    //   .then((response) => {
    //     // Handle the response
    //     if (response.status == 200) {
    //       setIsSubmitted(true);
    //       //   navigate("/admin")
    //     } else {
    //       console.log("Failed to create service.");
    //     }
    //   })
    //   .catch((error) => {
    //     // Handle errors
    //     console.log("Error:", error);
    //   });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const renderSectionDropdown = () => (
    <div className="mb-4">
      <label htmlFor="section" className="block font-semibold">
        Select a Section
      </label>
      <select
        id="section"
        name="section"
        value={selectedSection}
        onChange={(e) => handleSectionSelect(e.target.value)}
        className="w-full border rounded-md p-2"
      >
        <option value="" disabled>
          Select a Section
        </option>
        {sections.map((section, index) => (
          <option key={index} value={section}>
            {section}
          </option>
        ))}
      </select>
    </div>
  );

  const renderSections = () => (
    <div>
      {Object.keys(sectionText).map((section) => (
        <div key={section} className="mb-4">
          <label className="block font-semibold">{section}</label>
          <textarea
            name={`section-${section}`}
            value={sectionText[section]}
            onChange={(e) => handleTextChange(section, e.target.value)}
            className="w-full border rounded-md p-2"
            rows="4"
          />
          <button
            type="button"
            onClick={() => handleSectionRemove(section)}
            className="mt-2 btn-remove-section bg-red-400 text-white p-2 rounded-md hover-bg-red-500 hover-shadow-md transition-all"
          >
            Remove Section
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border border-opacity-400 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">
        Update an existing Service
      </h1>
      <form onSubmit={handleAddService}>
        <div className="mb-4">
          <label htmlFor="id" className="block font-semibold">
            Select Service Name
          </label>
          <select
            id="service_name"
            name="service_name"
            placeholder="Select a service name"
            className="w-full border rounded-md p-2"
            onClick={(e) => handleDisplayService(e.target.value)}
          >
            {products.map((product, index) => (
              <option key={index} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block font-semibold">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            text="salut"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="organiser" className="block font-semibold">
            Organiser
          </label>
          <input
            type="text"
            id="organiser"
            name="organiser"
            value={formData.organiser}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block font-semibold">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="iban" className="block font-semibold">
            IBAN
          </label>
          <input
            type="number"
            id="iban"
            name="iban"
            value={formData.iban}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4 relative flex flex-row">
          <label className="block font-semibold">
            Options Share the Same City
            <input
              type="checkbox"
              id="options_common_city"
              name="options_common_city"
              checked={formData.options_common_city}
              onChange={handleInputChange}
              className="w-5 h-4 ml-2 mr-2"
            />
          </label>
          <div className="relative group">
            <div
              className={`info-icon-container bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer `}
            >
              <span className="info-icon text-white font-semibold">i</span>
            </div>
            <div className="flex flex-1 w-[15rem] bg-blue-400 text-white text-[0.8rem] hidden group-hover:block absolute z-10 shadow-md p-2 mt-2 rounded-lg">
              <p>
                If there are more options that may differ with price or
                coordinator etc., but the activities are taking place in the
                same city, check this box
              </p>
            </div>
          </div>
        </div>

        {formData.options_common_city && (
          <div className="mb-4">
            <label htmlFor="city" className="block font-semibold">
              City
            </label>
            <input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
        )}

        {formData.options_common_city && (
          <div className="mb-4">
            <label htmlFor="county" className="block font-semibold">
              County
            </label>
            <input
              id="county"
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              required
              className="w-full border rounded-md p-2"
            />
          </div>
        )}

        {formData.options_common_city && (
          <div className="mb-4 relative  flex flex-row">
            <label className="block font-semibold">
              Options Share a Common Location
              <input
                type="checkbox"
                id="common_location"
                name="common_location"
                checked={formData.common_location}
                onChange={handleInputChange}
                className="w-5 h-4 ml-2 mr-2"
              />
            </label>
            <div className="relative group">
              <div
                className={`info-icon-container bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer `}
              >
                <span className="info-icon text-white font-semibold">i</span>
              </div>
              <div className="flex flex-1 w-[15rem] bg-blue-400 text-white text-[0.8rem] hidden group-hover:block absolute z-10 shadow-md p-2 mt-2 rounded-lg">
                <p>
                  If there are more options that may differ with price or
                  coordinator etc., but the activities are taking place at the
                  same location, check this box.
                </p>
              </div>
            </div>
          </div>
        )}

        {formData.options_common_city && formData.common_location && (
          <div className="mb-4">
            <label htmlFor="location" className="block font-semibold">
              Location (Address)
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        )}

        {formData.options_common_city && formData.common_location && (
          <div className="mb-4">
            <label
              htmlFor="map_location"
              className="block font-semibold text-[1.2rem]"
            >
              Map Location
              <span className="text-[1rem]">
                {" "}
                - Please select the location on the map
              </span>
            </label>
            <div className="w-full h-80 border rounded-md">
              <MapContainer
                center={mapLocation}
                zoom={5}
                style={{ height: "100%" }}
                // onClick={handleMapLocationChange}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={formMarkerPosition} icon={markerIcon}>
                  <Popup>Selected Location</Popup>
                </Marker>

                <MapEventsHandler handleMarkerClick={handleMarkerClick} />
              </MapContainer>
            </div>
          </div>
        )}

        <div className="mb-4 relative flex flex-row">
          <button
            type="button"
            onClick={handleAddServiceOption}
            className="btn-add-option bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
          >
            Add Option
          </button>
          <div className="ml-2 relative group">
            <div
              className={`info-icon-container bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer `}
            >
              <span className="info-icon text-white font-semibold">i</span>
            </div>
            <div className="flex flex-1 w-[15rem] bg-blue-400 text-white text-[0.8rem] hidden group-hover:block absolute z-10 shadow-md p-2 mt-2 rounded-lg">
              <p>
                The options represent the details of a service. For example, if
                the service is a trip, then the options represent the different
                days of the trip. If the service is a course, then the options
                represent the different days of the course. If there is only one
                option, it means that it is a singular service and all data from
                the options will be represented as it must be. There should be
                at least one option, as it includes price, date etc.
              </p>
            </div>
          </div>
        </div>

        {/* Options Section */}
        {options.length > 0 && (
          <div className="mt-4 border border-2 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Service Options</h2>

            {/* Render the list of options */}
            {options.map((option, index) => (
              <div key={index} className="mb-2 p-2 border border-2 rounded-md">
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="mb-2 btn-remove-option bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
                >
                  Remove
                </button>
                <div className="mb-2">
                  <label
                    htmlFor={`optionName${index}`}
                    className="block font-semibold"
                  >
                    Option Name
                  </label>
                  <input
                    type="text"
                    id={`optionName${index}`}
                    name="name"
                    value={option.name}
                    onChange={(e) =>
                      handleOptionChange(index, "name", e.target.value)
                    }
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor={`optionPrice${index}`}
                    className="block font-semibold"
                  >
                    Price <span className="text-[0.8rem]"> (RON)</span>
                  </label>
                  <input
                    type="number"
                    id={`optionPrice${index}`}
                    name="price"
                    value={option.price}
                    onChange={(e) =>
                      handleOptionChange(index, "price", e.target.value)
                    }
                    required
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`optionDetails${index}`}
                    className="block font-semibold"
                  >
                    Details
                  </label>
                  <textarea
                    id={`optionDetails${index}`}
                    name="details"
                    value={option.details}
                    onChange={(e) =>
                      handleOptionChange(index, "details", e.target.value)
                    }
                    rows="4"
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor={`optionDateTime${index}`}
                    className="block font-semibold"
                  >
                    Option Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    id={`optionDateTime${index}`}
                    name="date_time"
                    value={option.date_time}
                    onChange={(e) =>
                      handleOptionChange(index, "date_time", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                  />
                </div>

                <div className="mb-2">
                  <label
                    htmlFor={`optionDuration${index}`}
                    className="block font-semibold"
                  >
                    Duration (D HH:MM)
                  </label>
                  <input
                    type="text"
                    id={`optionDuration${index}`}
                    name="duration"
                    value={option.duration}
                    onChange={(e) =>
                      handleOptionChange(index, "duration", e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                    placeholder="e.g., 2d 3h 30m"
                  />
                </div>
                {!(
                  formData.options_common_city === true &&
                  formData.common_location === true
                ) && (
                  <div className="mb-4 relative flex flex-row">
                    <label className="block font-semibold">
                      Option Has Location
                      <input
                        type="checkbox"
                        id={`optionHasLocation${index}`}
                        name="option_has_location"
                        checked={option.option_has_location}
                        onChange={() =>
                          handleOptionChange(
                            index,
                            "option_has_location",
                            !option.option_has_location,
                          )
                        }
                        className="w-5 h-4 ml-2 mr-2"
                      />
                    </label>
                    <div className="relative group">
                      <div
                        className={`info-icon-container bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer `}
                      >
                        <span className="info-icon text-white font-semibold">
                          i
                        </span>
                      </div>
                      <div className="flex flex-1 w-[15rem] bg-blue-400 text-white text-[0.8rem] hidden group-hover:block absolute z-10 shadow-md p-2 mt-2 rounded-lg">
                        <p>
                          If there is a physical location for this option then
                          please enter it. If, for all options, there is a
                          common location, check the "common location" box.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {formData.options_common_city === false &&
                  option.option_has_location && (
                    <div className="mb-4">
                      <label
                        htmlFor={`optionCity${index}`}
                        className="block font-semibold"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id={`optionCity${index}`}
                        name="city"
                        value={option.city}
                        onChange={(e) =>
                          handleOptionChange(index, "city", e.target.value)
                        }
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  )}

                {formData.options_common_city === false &&
                  option.option_has_location && (
                    <div className="mb-4">
                      <label
                        htmlFor={`optionCounty${index}`}
                        className="block font-semibold"
                      >
                        County
                      </label>
                      <input
                        type="text"
                        id={`optionCounty${index}`}
                        name="county"
                        value={option.county}
                        onChange={(e) =>
                          handleOptionChange(index, "county", e.target.value)
                        }
                        className="ew-full border rounded-md p-2"
                      />
                    </div>
                  )}

                {formData.common_location === false &&
                  option.option_has_location && (
                    <div className="mb-4">
                      <label
                        htmlFor={`optionLocation${index}`}
                        className="block font-semibold"
                      >
                        Location (Address)
                      </label>
                      <input
                        type="text"
                        id={`optionLocation${index}`}
                        name="location"
                        value={option.location}
                        onChange={(e) =>
                          handleOptionChange(index, "location", e.target.value)
                        }
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  )}

                {option.option_has_location && (
                  <div className="mb-4">
                    <label
                      htmlFor={`optionMapLocation${index}`}
                      className="block font-semibold text-[1.2rem]"
                    >
                      Map Location
                      <span className="text-[1rem]">
                        {" "}
                        - Please select the location on the map
                      </span>
                    </label>
                    <div className="w-full h-80 border rounded-md">
                      <MapContainer
                        center={mapLocation}
                        zoom={5}
                        style={{ height: "100%" }}
                        // onClick={(e) => handleMapLocationChange(e)}
                      >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker
                          position={
                            optionMarkerPositions[index] || [44.43, 26.09]
                          }
                          icon={markerIcon}
                        >
                          <Popup>Selected Location</Popup>
                        </Marker>{" "}
                        d
                        <MapEventsHandler
                          handleMarkerClick={(e) =>
                            handleOptionMarkerClick(e, index)
                          }
                        />
                      </MapContainer>
                    </div>
                  </div>
                )}

                {/* Add more input fields for other ServiceOption model attributes */}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 mb-4">
          <label htmlFor="section" className="block font-semibold">
            Select a Section with extra information about the service
          </label>
          <select
            id="section"
            name="section"
            value={selectedSection}
            onChange={(e) => handleSectionSelect(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="" disabled>
              Select a Section
            </option>
            {sections.map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {Object.keys(sectionText).length > 0 && renderSections()}

        <div className="mt-4 mb-4">
          <label htmlFor="imageUpload" className="block font-semibold">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="btn-submit bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
        >
          Create New Service
        </button>
      </form>
      {/* {isSubmitted && <div className="text-green-600 mt-4">Service has been successfully added!</div>} */}
    </div>
  );
}

export default AdminUpdateServiceProduct;
