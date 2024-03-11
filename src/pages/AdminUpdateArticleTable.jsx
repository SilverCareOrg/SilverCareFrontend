import React from "react";
import axios_api from "../api/axios_api";
import { useEffect, useState } from "react";

function AdminUpdateArticleTable() {
  const [articles, setArticles] = useState([]);
  const [articleLimit, setArticleLimit] = useState(10);
  const [totalArticles, setTotalArticles] = useState();
  const get_all_articles = (articleLimit) => {
    try {
      axios_api
        .get("/get_articles", {
          params: { inf_limit: articleLimit - 10, sup_limit: articleLimit },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const json = response.data;
            setTotalArticles(json.total);
            setArticles([...articles.concat(json.articles)]);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) { }
  };

  const setArticleVisibility = (article) => {
    try {
      axios_api
        .post("/set_article_visibility",
          {
            id: article.id,
            hidden: !article.hidden,
          },
          {
            withCredentials: true,
          })
        .then((response) => {
          if (response.status === 200) {
            console.log('Article visibility updated');
            setArticles(currentArticles => currentArticles.map((art) => {
              if (art.id === article.id) {
                // Return a new object with the updated visibility
                return { ...art, hidden: !art.hidden };
              }
              return art;
            }));
          }
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } catch (err) { }
  };

  function handleArticleChange() {
    setArticleLimit(articleLimit + 10)
  }

  useEffect(() => {
    get_all_articles(articleLimit);
  }, [articleLimit]);


  useEffect(() => {
    const onScroll = () => {
      // if articles.length = articles.total
      if (totalArticles < articles.length) {
        if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 150) {
          handleArticleChange();
        }
      }
    }
    window.addEventListener('scroll', onScroll)
  }, [])

  function goToProductUpdatePage(id) {
    window.location.href = `/adminUpdateArticle/${id}`;
  }

  function handleArticleVisibility(article) {
    console.log(article?.title)
    setArticleVisibility(article);
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
            <div className="flex align-center items-center ml-16 mt-2">
              <p className="text-red-600 text-xl">Hide Article</p>
              <input
                type="checkbox"
                id="common_location"
                name="common_location"
                checked={article?.hidden}
                onChange={() => handleArticleVisibility(article)}
                className="w-10 h-10 ml-2 mr-2"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminUpdateArticleTable;
