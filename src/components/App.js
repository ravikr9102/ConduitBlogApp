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
import Settings from './Settings';
import Profile from './Profile';
import { withRouter } from '../utils/withRouter';

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
  handleLogout = () => {
    this.setState({
      isSignIn: false,
      user: null,
    });
    this.props.navigate('/');
    localStorage.clear();
  };

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
        {this.state.isSignIn ? (
          <AuthenticatedApp user={this.state.user} logout={this.handleLogout} />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}
      </React.Fragment>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/articles/:slug"
        element={<SinglePost user={props.user} />}
      />
      <Route path="/new-post" element={<NewPost user={props.user} />} />
      <Route
        path="/settings"
        element={<Settings logout={props.logout} user={props.user} />}
      />
      <Route path="/:profile" element={<Profile user={props.user} />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
function UnauthenticatedApp(props) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/articles/:slug"
        element={<SinglePost user={props.user} />}
      />
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
  );
}

export default withRouter(App);
