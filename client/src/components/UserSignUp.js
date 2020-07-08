import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errors: []

  }

   render() {
     const { 
       firstName,
       lastName,
       emailAddress,
       password,
       confirmPassword,
       errors
     } = this.state;

       return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            { <ul>
                {errors.map((error, i) => <li key={i}> {error} </li>)}
              </ul> }
            <form onSubmit={this.submit}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" onChange={this.change} value={firstName}></input></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" onChange={this.change} value={lastName}></input></div>
              <div><input id="userName" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change} value={emailAddress}></input></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password}></input></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" onChange={this.change}
                  value={confirmPassword}></input></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
            </form>
          </div>          
          <p>Already have a user account? <Link to="/signin">Click here </Link>to sign in!</p>
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

   handleSubmit = () => {
     
     const { context } = this.props;
    const { 
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    };
  context.data.createUser(user)
  .then( errors => {
    if(errors.length) {
      this.setState({ errors })
      console.log(errors);
    } else {
      console.log(`${emailAddress} is successful signed up!` );
    }
  }).catch(err => {
    console.log(err);
    this.props.history.push('/error');
  })

   }

   submit = (event) => {
     event.preventDefault();
     this.handleSubmit();
   }

   cancel = () => {
    this.props.history.push('/');
   }
}

export default UserSignUp;