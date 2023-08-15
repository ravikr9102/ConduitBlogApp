import React from 'react';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="container mx-auto mt-8">
        <form
        //   onSubmit={this.handleSubmit}
          className="text-right max-w-4xl mx-auto"
          action=""
        >
          <input
            className="block w-full border px-4 py-3 rounded-sm"
            type="text"
            placeholder="Article Title"
            name="title"
            // value={this.state.title}
            // onChange={this.handleChange}
          />
          <input
            className="block w-full border px-4 py-3 rounded-sm mt-4"
            type="text"
            placeholder="What's this article about?"
            name="description"
            // onChange={this.handleChange}
            // value={this.state.description}
          />
          <textarea
            className="block w-full border px-4 py-3 rounded-sm mt-4"
            name="body"
            id=""
            rows="10"
            placeholder="Write your article (in markdown)"
            // onChange={this.handleChange}
            // value={this.state.body}
          ></textarea>
          <input
            className="block w-full border px-4 py-3 rounded-sm mt-4"
            type="text"
            placeholder="Enter Tags"
            name="tagList"
            // onChange={this.handleChange}
            // value={this.state.tagList}
          />
          <button
            // onClick={this.handleSubmit}
            className="mt-8 bg-green-500 text-white px-4 py-2 text-xl rounded-md"
          >
            Publish Article
          </button>
        </form>
      </section>
    );
  }
}

export default NewPost;