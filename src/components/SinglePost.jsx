import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from '../utils/withRouter';
import { articlesURL } from '../utils/constant';
import Loader from './Loader';
import CreateComment from './CreateComment';
// import Comments from './Comments';

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
          article: data.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({
          error: 'Not able to fetch articles!',
        });
      });
  }
  deleteArticle = () => {
    let slug = this.props.params.slug;
    fetch(articlesURL + "/" + slug, {
      method: "DELETE",
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return this.props.navigate('/');
        }
        return res.json();
      })
      .then((data) => {
        this.props.navigate("/");
      });
  };
  render() {
    let { article, error } = this.state;
    // let comments = this.props.comments
    let slug = this.props.params.slug;

    if (error) {
      return <p className="text-center p-5">{error}</p>;
    }

    if (!this.state.article) {
      return <Loader />;
    }
    return (
      <>
        <article>
          <header className="bg-gray-900 py-10">
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
              <div>
                {this.props.user === null ? (
                  ""
                ) : this.props.user.username === article.author.username ? (
                  <div className="flex mt-8">
                    <Link
                      to={`/editor/${slug}`}
                      state={{ article: article }}
                      params={{ article }}
                      className="flex items-center text-gray-400 border border-gray-400 py-1 px-3 rounded-md mr-4 hover:bg-gray-400 hover:text-white"
                    >
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={this.deleteArticle}
                      className="flex items-center border py-1 px-3 rounded-md border-red-900 text-red-900 hover:bg-red-900 hover:text-white"
                    >
                      <span className="">Delete</span>
                      </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </header>
          <section className="px-12 py-5">
            <p className="text-xl text-gray-600 leading-normal">
              {article.body}
            </p>
            <div className="mt-4">
              {article.tagList.map((tag) => (
                <span
                  key={tag}
                  className="border rounded-xl px-3 py-1 text-sm text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
            </section>
        </article>
        {this.props.user === null ? (
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
        ) : (
          <CreateComment user={this.props.user} slug={this.props.params.slug} />
        )}
        <section className="max-w-2xl mx-auto mt-8 pb-12">
          {/* <Comments
            comment={this.props.comment}
            slug={this.props.params.slug}
            user={this.props.user}
          /> */}
        </section>
        </>
    );
  }
}

export default withRouter(SinglePost);