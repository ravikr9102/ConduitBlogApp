import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import { articlesURL } from '../utils/constant';
import Loader from './Loader';

class SinglePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      error: '',
    };
  }

  componentDidMount() {
    let slug = this.props.params.slug;
    fetch(articlesURL + `/` + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          article: data.article.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({
          error: 'Not able to fetch articles!',
        });
      });
  }

  render() {
    let { article, error } = this.state;

    if (error) {
      return <p className="text-center p-5">{error}</p>;
    }

    if (!this.state.article) {
      return <Loader />;
    }
    return (
      <>
        <article>
          <header className="bg-gray-900 py-20">
            <div className="text-white px-12 py-5">
              <h1 className="text-white text-3xl">{article.title}</h1>
              <div className="flex items-center mt-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={article.author.image}
                  alt={article.author.username}
                />
                <div className="ml-3">
                  <cite className="block not-italic text-white">
                    {article.author.username}
                  </cite>
                  <time dateTime="">
                    {String(new Date(article.createdAt)).slice(0, 16)}
                  </time>
                </div>
              </div>
            </div>
          </header>
          <section className="px-12 py-5">
            <p className="text-xl text-gray-600 leading-normal">
              {article.body}
            </p>
            <div className="mt-4">
              {article.taglist.map((tag) => (
                <span key={tag} className="border rounded-xl px-3 py-1 text-sm text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </section>
        </article>
        <section className="mt-12 border-t container mx-auto py-12">
          <div className="max-w-xl mx-auto">
            <p>
              <Link className="text-green-500" to="/signin">
                Sign in
              </Link>{' '}
              or{' '}
              <Link className="text-green-500" to="/signup">
                Sign up{' '}
              </Link>
              to add comments on this article
            </p>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(SinglePost);