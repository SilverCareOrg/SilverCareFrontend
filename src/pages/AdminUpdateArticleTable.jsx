import React from "react";
import axios_api from "../api/axios_api";
import { useEffect, useState } from "react";

function AdminUpdateArticleTable() {
  const [articles, setArticles] = useState([]);
  const get_all_articles = () => {
    try {
      axios_api
        .get("/get_articles", {
          params: {},
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setArticles(json.services);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) {}
  };

  useEffect(() => {
    get_all_articles();
    console.log(articles);
  }, []);

  function goToProductUpdatePage(id) {
    window.location.href = `/adminUpdateArticle/${id}`;
  }

  return (
    <>
      <div className="w-[25wh] pb-32 pt-16">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex justify-between items-center m-auto max-w-[800px] p-4"
          >
            <div className="flex flex-col items-start">
              <div className="text-blue-600 text-2xl">
                ID: {article.id} Article title: {article.title}
              </div>
              <div>
                <p>Author: {article.author}</p>
                <p>Category: {article.category}</p>
              </div>
            </div>
            <button
              onClick={() => goToProductUpdatePage(article.id)}
              className="btn-submit ml-12 bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 hover:shadow-md transition-all"
            >
              Update Article with ID:{article.id}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminUpdateArticleTable;
