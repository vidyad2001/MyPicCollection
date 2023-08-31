import React, { useState, useEffect} from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';

 function App() {
  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(true);
  const[currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles= () => {
    setLoading(true);
    axios
    .get('https://picsum.photos/v2/list?page=${currentPage}')
    .then((response) => {
      setLoading(false);
      setArticles((prevArticles) => [...prevArticles, ...response.data]);
      setCurrentPage(currentPage +1);
    });
  };

  window.addEventListener("scroll",()=>{
    if(
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ){
      fetchArticles();
    }
  });
  const handleThumbsUp = (index) =>{
    const updatedArticles = [...articles];
    updatedArticles[index].thumbsUpCount =
    (updatedArticles[index].thumbsUpCount || 0)+1;
    setArticles(updatedArticles);

  };
  return(
    <>
    <h1 className="title">Photo Gallery</h1>
    <div className="artContent">
      {articles.map((article, index) => (
        <div key={index} className="Member">
          <img
          src={article.download_url}
          alt="Article Image"
          className="Member-image"
          />
          <div className="Member-info">
            <div className="Setter">{article.author}</div>
            <div
            className="FavCount">
              <button className="HeartCount" onClick={()=>handleThumbsUp(index)}>
                <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <span className="count">
                  {article.thumbsUpCount || 0}
                </span>
          </div>
          </div>
          </div>


      ))}
      {loading && <div className="start">Loading...</div>}
    </div>
    </>
  );
}

export default App;