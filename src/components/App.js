import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import SinglePost from './SinglePost';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NoMatch from './NoMatch';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:slug" element={<SinglePost />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;