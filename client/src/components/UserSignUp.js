import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {
  state = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpassword: '',
    errors: []

  }

   render() {
     const { 
       firstname,
       lastname,
       username,
       password,
       confirmpassword,
       errors
     } = this.state;

       return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.submit}>
              <div><input id="firstName" name="firstname" type="text" className="" placeholder="First Name" onChange={this.change} value={firstname}></input></div>
              <div><input id="lastName" name="lastname" type="text" className="" placeholder="Last Name" onChange={this.change} value={lastname}></input></div>
              <div><input id="userName" name="username" type="text" className="" placeholder="Email Address" onChange={this.change} value={username}></input></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password}></input></div>
              <div><input id="confirmPassword" name="confirmpassword" type="password" className="" placeholder="Confirm Password" onChange={this.change}
                  value={confirmpassword}></input></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account?<a href="sign-in.html"> <Link to="/signin">Click here </Link></a>to sign in!</p>
        </div>
      </div>
       );
   }
   change = (event) => {
     const name = event.target.name;
     const value = event.target.value;

     this.setState( () => {
       return {
        [name]: value,
       }
     });

   }

   submit = () => {
     const { context } = this.props;
    const { 
      firstname,
      lastname,
      username,
      password,
      confirmpassword,
    } = this.state;

    const user = {
      firstname,
      lastname,
      username,
      password,
      confirmpassword
    };
  context.data.creatUser(user)
  .then( errors => {
    if(errors.length) {
      this.setState({ errors })
    } else {
      console.log(`${username} is successful signed up!` );
    }
  }).catch(err => {
    console.log(err);
    this.props.history.push('/error');
  })

   }

   cancel = () => {
    this.props.history.push('/');
   }
}

export default UserSignUp;