import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios_api from "../api/axios_api";
import { ArticleBar } from "../components/ArticleBar";
import ArticlesOption from "../components/ArticlesOption";
import DisplayArticle from "../components/DisplayArticle";

const Articles = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get('category');
  const [articles, setArticles] = useState([]);
  const [articleLimit, setArticleLimit] = useState(10);
  const [totalArticles, setTotalArticles] = useState();
  const get_all_articles = (articleLimit) => {
    try {
      axios_api
        .get("/get_articles", {
          params: { inf_limit: articleLimit - 10, sup_limit: articleLimit, category: category },
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

  function handleArticleChange() {
    setArticleLimit(articleLimit + 10)
  }

  useEffect(() => {
    console.log(category)
    get_all_articles(articleLimit);
  }, [articleLimit]);


  useEffect(() => {
    const onScroll = () => {
      // if articles.length = articles.total
      if (totalArticles < articles.length) {
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
      <div>
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
