import React, { useState, useEffect, useRef } from "react";
import axios_api from "../api/axios_api";
import { useParams } from "react-router-dom";
import "../styles/styles.css";

function AdminUpdateArticle() {
  const [categories, setCategories] = useState([]);
  const [paragraphText, setParagraphText] = useState([]);
  const [paragraphImage, setParagraphImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const id = useParams();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    reading_time: "",
    category: "",

    // ... Other fields from the Service model
  });

  const handleArticleCategory = async () => {
    axios_api
      .get("/get_articles_types", {
        withCredentials: true,
        headers: {
          //   'X-CSRFToken': `${localStorage.getItem('csrftoken')}`, // Set the CSRF token in the request headers
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":
            "multipart/form-data;  boundary=----WebKitFormBoundaryEXAMPLE",
        },
      })
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          const json = response.data;
          for (let i = 0; i < json.length; i++) {
            let category = json[i];
            setCategories((prevCategories) => {
              return [...prevCategories, category];
            });
          }
        } else {
          console.log("Failed to create service.");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
    
  };

  const get_article = () => {
    const url = `/get_article?id=${id.id}`;
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
            const currentArticle = response.data;
            console.log(currentArticle);
            for (let i = 0; i < currentArticle?.texts.length; i++) {
              setParagraphText([
                ...paragraphText,
                currentArticle?.texts[i].text,
              ]);
              setParagraphImage([
                ...paragraphImage,
                currentArticle?.texts[i].image,
              ]);
            }

            setFormData(() => ({
              title: currentArticle?.title,
              author: currentArticle?.author,
              description: currentArticle?.description,
              reading_time: currentArticle?.reading_time,
              category: currentArticle?.category,
            }));
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {}
  };

  useEffect(() => {
    get_article();
    handleArticleCategory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddParagraphOption = () => {
    const newParagraphText = {};
    setParagraphText([...paragraphText, newParagraphText]);
  };

  const handleOptionChange = (index, name, value) => {
    const updatedOptions = [...paragraphText];
    updatedOptions[index][name] = value;
    setParagraphText(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedText = [...paragraphText];
    const updatedImage = [...paragraphImage];
    updatedText.splice(index, 1);
    updatedImage.splice(index, 1);
    setParagraphText(updatedText);
    setParagraphImage(updatedImage);
  };

  const handleUpdateArticle = async (event) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();

    formDataToSubmit.append("image", selectedImage);
    if (paragraphText.length !== 0) {
      formDataToSubmit.append("paragraphText", JSON.stringify(paragraphText));
    }
    if (paragraphImage.length !== 0) {
      formDataToSubmit.append("paragraphImage", paragraphImage);
    }
    // Submit both the text and image in a "paragraphs" variable
    // formDataToSubmit.append("paragraphs", [
    //   paragraphImage,
    //   JSON.stringify(paragraphText),
    // ]);
    // Append all fields from formData
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    // add id in formDataToSubmit
    formDataToSubmit.append("id", id.id);

    //logging out 'formdatatosubmit'
    for (var pair of formDataToSubmit.entries()) {
      console.log(pair[0] + " - " + pair[1]);
    }
    // console.log(paragraphImage);
    // console.log(paragraphText);

    const url = `/edit_article`;
    axios_api
      .post(url, formDataToSubmit, {
        withCredentials: true,
        headers: {
          //   'X-CSRFToken': `${localStorage.getItem('csrftoken')}`, // Set the CSRF token in the request headers
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type":
            "multipart/form-data;  boundary=----WebKitFormBoundaryEXAMPLE",
        },
      })
      .then((response) => {
        // Handle the response
        if (response.status === 200) {
          //   navigate("/admin")
        } else {
          console.log("Failed to create service.");
        }
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:", error);
      });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleParagraphImageUpload = (event) => {
    const file = event.target.files[0];
    setParagraphImage([...paragraphImage, file]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border border-opacity-400 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">
        Update an existing article
      </h1>
      <form onSubmit={handleUpdateArticle}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-semibold">
            Article Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData?.title}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block font-semibold">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData?.author}
            onChange={handleInputChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reading_time" className="block font-semibold">
            Timp de citire
          </label>
          <input
            placeholder='use this format "x min" ex: 10 min'
            type="text"
            id="reading_time"
            name="reading_time"
            value={formData?.reading_time}
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
            // categories[formData?.category][1]
            value={formData?.category}
            onChange={handleInputChange}
            className="w-full border rounded-md p-2"
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories.map((category) => (
              <option key={category[0]} value={category[0]}>
                {category[1]}
              </option>
            ))}
          </select>
        </div>

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

        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="mb-4 relative flex flex-row">
          <button
            type="button"
            onClick={handleAddParagraphOption}
            className="btn-add-option bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
          >
            Add Paragraph
          </button>
          <div className="ml-2 relative group">
            <div
              className={`info-icon-container bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer `}
            >
              <span className="info-icon text-white font-semibold">i</span>
            </div>
            <div className="flex flex-1 w-[15rem] bg-blue-400 text-white text-[0.8rem] hidden group-hover:block absolute z-10 shadow-md p-2 mt-2 rounded-lg">
              <p>The options represent the details of a paragraph.</p>
            </div>
          </div>
        </div>

        {/* Options Section */}
        {paragraphText.length > 0 && (
          <div className="mt-4 border-2 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Paragraph</h2>

            {/* Render the list of options */}
            {paragraphText.map((option, index) => (
              <div key={index} className="mb-2 p-2 border-2 rounded-md">
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="mb-2 btn-remove-option bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
                >
                  Remove
                </button>
                <div className="mt-4 mb-4">
                  <label
                    htmlFor="paragraphImage"
                    className="block font-semibold"
                  >
                    Upload Paragraph Image
                  </label>
                  <input
                    id={`paragraphImage${index}`}
                    type="file"
                    accept="image/*"
                    onChange={handleParagraphImageUpload}
                    className="w-full border rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`paragraphText${index}`}
                    className="block font-semibold"
                  >
                    Paragraph Text
                  </label>
                  <textarea
                    id={`paragraphText${index}`}
                    name="paragraphDetails"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, "text", e.target.value)
                    }
                    rows="4"
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="btn-submit mt-20 bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
        >
          Create New Service
        </button>
      </form>
    </div>
  );
}

export default AdminUpdateArticle;
