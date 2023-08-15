import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <React.Fragment>
      <header>
        <div className="flex justify-between align-middle px-12 py-5">
          <Link to="/">
            <strong className="text-green-400 font-extrabold text-2xl">
              Conduit
            </strong>
          </Link>
          <div>
            {props.isSignIn ? (
              <AuthHeader user={props.user} />
            ) : (
              <NonAuthHeader />
            )}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

function NonAuthHeader() {
  return (
    <nav>
      <ul className="flex ml-3">
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink activeclassname="text-slate-900" to="/" exact="true">
            {' '}
            Home
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink activeclassname="text-slate-600" to="/signin">
            Sign In
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink activeclassname="text-slate-600" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

function AuthHeader(props) {
  return (
    <nav>
      <ul className="flex ml-3">
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink activeclassname="text-slate-900" to="/" exact="true">
            {' '}
            Home
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink activeclassname="text-slate-600" to="/new-post">
            New Article
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink activeclassname="text-slate-600" to="/settings">
            Settings
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-4 ">
          <NavLink
            activeclassname="text-slate-600"
            to={`/${props.user.username}`}
          >
            {props.user.username}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}