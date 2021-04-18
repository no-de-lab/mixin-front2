import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';

const ArticleList = ({ store }) => {
  const { articles } = store.articleStore;

  return (
    <div className="bg-white">
      {
    articles.length > 0 && articles.map((article) => (
      <div key={article.title}>
        <div style={{ color: 'black' }}>{article.title}</div>
      </div>
    ))
  }

    </div>
  );
};

// inject("store") 고정
export default inject('store')(observer(ArticleList));
