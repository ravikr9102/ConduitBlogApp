import React from 'react';
import Post from './Post';
import Loader from './Loader';

export default function Posts(props) {
  const { articles, error } = props;
  if (error) {
    return <p className="text-center p-2">{error}</p>;
  }
  // console.log(articles);
  if (!articles) {
    return (
      <React.Fragment>
        <Loader />
      </React.Fragment>
    );
  }
  return articles.map((article, i) => <Post key={i} {...article} />);
}