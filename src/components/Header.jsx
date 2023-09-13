import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';


export default function Header(props) {
  return (
    <React.Fragment>
      <header>
        <div className="md:flex justify-between items-center align-middle md:px-12 py-5 text-center">
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
      <ul className="flex justify-between ml-3 py-2 md:py-0 px-6 md:px-0">
        <li className="text-base font-medium text-slate-300 md:ml-4 ">
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
      <ul className="flex justify-between md:ml-3 py-3 md:py-0 md:px-0">
        <li className="text-base font-medium text-slate-300 ml-3 md:ml-4">
          <NavLink activeclassname="text-slate-900" to="/" exact="true">
            {' '}
            Home
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-2 md:ml-4 flex justify-center items-center">
        <BsPencilSquare className='mr-1' />
          <NavLink activeclassname="text-slate-600" to="/new-post">
            New Post
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 ml-2 md:ml-4 flex justify-center items-center">
        <AiFillSetting className='mr-1' />
          <NavLink activeclassname="text-slate-600" to="/settings">
            Settings
          </NavLink>
        </li>
        <li className="text-base font-medium text-slate-300 mr-3 md:mr-0 md:ml-4">
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