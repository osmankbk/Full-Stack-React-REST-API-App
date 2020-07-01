import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav><Link to="/signup"><a className="signup" href="sign-up.html">Sign Up</a></Link><Link to="/signin"><a className="signin" href="sign-in.html">Sign In</a></Link></nav>
        </div>
      </div>
    );
}

export default Header;