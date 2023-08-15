import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import SinglePost from './SinglePost';
import SignIn from './SignIn';
import SignUp from './SignUp';
import NoMatch from './NoMatch';
import { localStorageKey, userVerifyURL } from '../utils/constant';
import FullPageSpinner from './fullPageSpinner';
import NewPost from './NewPost';
// import { withRouter } from "./utils/withRouter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: false,
      user: null,
      isVerifying: true,
    };
  }
  componentDidMount() {
    const storageKey = localStorage.getItem(localStorageKey);
    if (storageKey) {
      fetch(userVerifyURL, {
        method: 'GET',
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
           return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({ isSignIn: true, user, isVerifying: false });
    localStorage.setItem(localStorageKey, user.token);
  };
  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <React.Fragment>
        <Header isSignIn={this.state.isSignIn} user={this.state.user} />
       {
        this.state.isSignIn ? <AuthenticatedApp /> : <UnauthenticatedApp updateUser={this.updateUser} />
       }
      </React.Fragment>
    );
  }
}

function AuthenticatedApp(){
  return(
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/articles/:slug" element={<SinglePost />} />
    <Route path='/new-post' element={<NewPost />} />
    <Route />
    <Route />
    <Route path="*" element={<NoMatch />} />
  </Routes>
  )
}

function UnauthenticatedApp(props){
  return(
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:slug" element={<SinglePost />} />
          <Route
            path="/signin"
            element={<SignIn updateUser={props.updateUser} />}
          />
          <Route
            path="/signup"
            element={<SignUp updateUser={props.updateUser} />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
  )
}

export default App;