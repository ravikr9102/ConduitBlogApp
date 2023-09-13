import React from "react";
import { tagsURL } from "../utils/constant";
import Loader from "./Loader";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: null,
      error: ''
    };
  }

  componentDidMount() {
    fetch(tagsURL)
    .then((res) => {
      if(!res.ok){
        throw new Error(res.statusText)
      }
      return res.json();
    })
    .then((data) => {
      this.setState({
        tags: data.tags,
        error: ''
      })
    }).catch((err) => {
      this.setState({
        error: 'Not able to fetch tags!'
      })
    })
}
render() {
    const { tags, error } = this.state;
    if(error){
      return <p className="text-center p-5">{error}</p>
    }
    if (!tags) {
      return (
        <aside className="w-1/4 pl-12">
          <h2><Loader /></h2>
        </aside>
      );
    }
    return (
      <aside className="md:w-1/4 md:pl-12 px-6 md:px-0">
        <h2 className="text-2xl font-bold mb-4 text-center md:text-start">Popular Tags</h2>
        <ul className="p-4 bg-gray-100 rounded-md">
          {tags.map((tag) => (
            <li
              className="inline-block bg-gray-500 hover:bg-gray-700 cursor-pointer text-white rounded-lg m-1 p-1 text-xs"
              key={tag}
              onClick={() => this.props.addTab(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </aside>
       );
    }
  }
  
  export default Sidebar;