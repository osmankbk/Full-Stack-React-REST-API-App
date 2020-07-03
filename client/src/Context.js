import React, { Component } from 'react';
import Data from './Data';
//import axios from 'axios';
const Context = React.createContext();


export class Provider extends Component {

  state = {
        
  }

  constructor() {
    super();
    this.data = new Data();

  }
   
     /* componentDidMount() {
        this.getCourse();
      }
      getCourse(){
        axios.get('http://localhost:5000/api/courses').then(response =>{
          this.setState({
            courses: response.data,
          });
          console.log(this.state.courses);
        }).catch(error => {
          console.log('error getting courses', error);
        })
      }*/
      render() {

        const value = {
            data: this.data,
            actions: { 
              signIn: this.signIn,
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
        return user;
      }
}

//export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
          <Context.Consumer>
            {context => <Component {...props} context={context} />}
          </Context.Consumer>
        );
    }
}



