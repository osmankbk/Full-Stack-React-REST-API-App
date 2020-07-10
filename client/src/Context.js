import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
const Context = React.createContext();


export class Provider extends Component {

  state = {
        authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
        courses: [],
  }
  /*componentDidMount() {
    this.getApiCourses(); 
    console.log(this.state.courses);
  }*/

  constructor() {
    super();
    this.data = new Data();

  }
   
      render() {
        const { authenticatedUser } = this.state;
        const value = {
          authenticatedUser,
            data: this.data,
            actions: { 
              signIn: this.signIn,
              signOut: this.signOut,
              //getApiCourses: this.getApiCourses,
            },
        }

          return (
              <Context.Provider value={value}>
                  {this.props.children}
              </Context.Provider>
          )
      }

      signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
        if(user !== null) {
          this.setState( () => {
            return {
              authenticatedUser: user,
            }
          });
          Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
      }

      signOut = () => {
        this.setState({
          authenticatedUser: null,
        })
        Cookies.remove('authenticatedUser');
      }
      getApiCourses = async () => {
        const courses = await this.data.getCourses();
        if(courses !== null) {
          this.setState(() => {
            return {
              courses: courses
            }
          })
        }
        return courses;
      }
}

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



