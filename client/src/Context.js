import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

export class Provider extends Component {
    state = {
        courses: []
      }
      componentDidMount() {
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
      }
      render() {

        const { courses } = this.state;

        const value = {
            courses,
        }
          return (
              <Context.Provider value={value}>
                  {this.props.children}
              </Context.Provider>
          )
      }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
          <Context.Consumer>
            {context => <Component {...props} context={context} />}
          </Context.Consumer>
        );
    }
}



