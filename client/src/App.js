import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    courses: []
  }
  componentDidMount() {
    this.getCourse();
  }
  getCourse(){
    fetch('http://localhost:5000/api/courses').then(response =>{
      this.setState({
        courses: response,
      });
    }).catch(error => {
      console.log('error getting courses');
    })
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>{
            this.state.courses.map(course => {
            return <ul><li>course.title</li></ul>
          })
          }</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

export default App;
