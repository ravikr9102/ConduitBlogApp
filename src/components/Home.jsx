import React from 'react';
import Banner from './Banner';
import Posts from './Posts';
import FeedNav from './FeedNav';
import Pagination from './Pagination';
import Sidebar from './Sidebar';
import { articlesURL } from '../utils/constant';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      error: '',
      articlesCount: 0,
      articlesPerPage: 10,
      activePageIndex: 1,
      activeTab: '',
    };
  }

  removeTab = () => {
    this.setState({
      activeTab: ''
    })
  }

  addTab = (value) => {
    this.setState({
      activeTab: value
      
    })
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.activePageIndex !== this.state.activePageIndex || prevState.activeTab !== this.state.activeTab) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const limit = this.state.articlesPerPage;
    const offset = (this.state.activePageIndex - 1) * limit;
    const tag = this.state.activeTab
    fetch(articlesURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`))
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        this.setState({
          articles: data.articles,
          error: '',
          articlesCount: data.articlesCount
        });
      })
      .catch((err) => {
        this.setState({
          error: 'Not able to fetch articles!',
        });
      });
  };

  updateCurrentPageIndex = (index) => {
    this.setState(
      {
        activePageIndex: index,
      },
      this.fetchData
    );
  };

  render() {
    const { articles, error, articlesCount, articlesPerPage, activePageIndex, activeTab } =
      this.state;
    return (
      <main>
        <Banner />
        <section className="py-12">
          <div className="container mx-auto md:flex">
            <div className="md:w-3/4">
              <FeedNav activeTab={activeTab} removeTab={this.removeTab} />
              <Posts articles={articles} error={error} />
              <Pagination
                articlesCount={articlesCount}
                articlesPerPage={articlesPerPage}
                activePageIndex={activePageIndex}
                updateCurrentPageIndex={this.updateCurrentPageIndex}
              />
            </div>
            <Sidebar error={error} addTab={this.addTab} />
          </div>
        </section>
      </main>
    );
  }
}

export default Home;