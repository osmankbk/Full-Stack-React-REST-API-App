import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';

class Header extends Component{
    
    render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
      return (
        <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          {authUser ?  <nav>
          <span>Welcome, {authUser.emailAddress}</span>
          <Link to="/signout"><a className="signin" href="sign-in.html">Sign Out</a></Link>
          </nav> :  <nav>
          <Link to="/signup"><a className="signup" >Sign Up</a></Link><Link to="/signin"><a className="signin" href="sign-in.html">Sign In</a></Link>
          </nav>}
         
        </div>
      </div>
    );
    }
   
}

export default Header;