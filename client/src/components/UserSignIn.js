import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//This component displays when a user is trying to sign in.
class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

   render() {
     const {
       emailAddress,
       password, 
       errors 
      } = this.state;
       return(
        <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
          { <ul>
                {errors.map((error, i) => <li key={i}> {error} </li>)}
              </ul> }
            <form onSubmit={this.submit}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" onChange={this.change} value={emailAddress}></input></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" onChange={this.change} value={password}></input></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={ this.cancle }>Cancel</button></div>
            </form>
          </div>
          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
       );
   }

//This function runs on change event enabling the inputs value to that of the change events value   
   change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState( () => {
      return {
       [name]: value,
      }
    });

  }
//This func runs the sign in function while preventing the forms default nature  
   submit = (event) => {
    event.preventDefault();
    this.handleSubmit();
   }

//This func makes GET request to the server
   handleSubmit = () => {
   const { context } = this.props;
   const { from } = this.props.location.state || { from: {pathname: '/' } }
   const { 
     emailAddress,
     password,
   } = this.state;

 context.actions.signIn(emailAddress, password)
 .then( user => {
   if(user === null) {
     this.setState( () => {
       return { errors: [ 'Sign-in was Unsuccessful'] }
     })
   } else {
    this.props.history.push(from);
    console.log(`SUCCESS! ${emailAddress} is now signed in!`);
   }
 }).catch(err => {
   console.log(err);
   this.props.history.push('/error');
 })

  } 
  
//This cancel the sign in process  
  cancle = () => {
    this.props.history.push('/');
  }
}

export default UserSignIn;