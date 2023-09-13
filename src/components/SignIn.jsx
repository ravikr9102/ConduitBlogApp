import React from 'react';
import { Link } from 'react-router-dom';
// import Validate from '../utils/Validate';
import { signinURL } from '../utils/constant';
import { withRouter } from '../utils/withRouter';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: '',
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };

    // Validate(name, value, errors);

    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fetch(signinURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        console.log(user);
        this.props.updateUser(user);
        // this.setState({ email: '', password: '' });
        this.props.navigate('/');
      })
      .catch((errors) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: 'email or password is incorrect!',
            },
          };
        })
      );
  };

  render() {
    let { email, password, errors } = this.state;
    return (
      <section className="mx-auto max-w-lg py-12">
        <header className="text-center">
          <h1 className=" text-4xl">Sign in</h1>
          <h6 className="mt-4 text-green-600 text-xl">
            <Link to="/signup">Need an account?</Link>
          </h6>
        </header>
        <form
          className="mt-8 text-center px-4"
          action=""
          onSubmit={this.handleSubmit}
        >
          <input
            className="block w-full border px-4 py-2 mb-3"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <span className="text-xl text-red-600">{errors.email}</span>
          <input
            className="block w-full border px-4 py-2 mb-3 mt-8"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
          <span className="text-xl text-red-600">{errors.password}</span>
          <div className="text-right mt-6">
            <button
              disabled={errors.email || errors.password}
              className="bg-green-600 text-white text-xl px-4 py-2 disabled:bg-gray-400 rounded"
            >
              Sign in
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default withRouter(SignIn);