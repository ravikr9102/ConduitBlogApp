import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <React.Fragment>
      <header>
        <div className="flex justify-between align-middle px-12 py-5">
          <Link to='/'>
            <strong className="text-green-400 font-extrabold text-2xl">Conduit</strong>
          </Link>
          <nav>
            <ul className="flex ml-3">
              <li className="text-base font-medium text-slate-300 ml-4 ">
                <NavLink activeclassname="text-slate-900" to="/" exact='true'>
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
        </div>
      </header>
    </React.Fragment>
  );
}