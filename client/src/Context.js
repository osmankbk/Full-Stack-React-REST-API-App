//Use React Context to share state & props to the rest of my components
//Imported the files Needed for that

import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
const Context = React.createContext();


export class Provider extends Component {

  state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        authPassword: Cookies.getJSON('authPassword') || null,

  }

  constructor() {
    super();
//All of my function calls a stored in this variable    
    this.data = new Data();

  }
   
      render() {
//I share my state, props and data to rest of my app from here
        const { authenticatedUser, authPassword} = this.state;
        const value = {
          authenticatedUser,
          authPassword,
            data: this.data,
            actions: { 
              signIn: this.signIn,
              signOut: this.signOut,
              getCourse: this.getACourse,
            },
        }

          return (
              <Context.Provider value={value}>
                  {this.props.children}
              </Context.Provider>
          )
      }
//My sign in function
      signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if(user !== null) {
          this.setState( () => {
            return {
              authenticatedUser: user,
              authPassword: password,
            }
          });
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
          Cookies.set('authPassword', JSON.stringify(password), { expires: 1 });
        }
        return user;
      }

//Sign Out function
      signOut = () => {
        this.setState({
          authenticatedUser: null,
        })
        Cookies.remove('authenticatedUser');
      };
}

//My consumer high order function
export const { Consumer } = Context;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
          <Context.Consumer>
            {context => <Component {...props} context={context} />}
          </Context.Consumer>
        );
    }
}



