import { useState, useEffect } from "react";
import axios_api from "../api/axios_api";
import { ArticleBar } from "../components/ArticleBar";
import ArticlesOption from "../components/ArticlesOption";
import DisplayArticle from "../components/DisplayArticle";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [articleLimit, setArticleLimit] = useState(10);
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
            setArticles([...articles.concat(json)]);
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
      if (articles.length % 10 === 0) {
        if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 1350) {
          handleArticleChange();
        }
      }
    }
    window.addEventListener('scroll', onScroll)
  }, [articles.length])


  return (
    <div>
      <ArticleBar />
      <div className="">
        <div>
          {articles?.map((article) => (
            <DisplayArticle key={article._id} article={article} />
          ))}
        </div>
      </div>
      <ArticlesOption topPx={435} />
    </div>
  );
};

export default Articles;
