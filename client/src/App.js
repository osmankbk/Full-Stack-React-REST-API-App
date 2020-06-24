import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Courses from './Courses';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import CourseDetail from './CourseDetail';
import UserSignIn from './UserSignIn';
import UserSignUp from './UserSignUp';
import Header from './Header';
import './App.css';

const App = () => {
 
  return (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route path="/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
      </Switch>
    </div>
  </BrowserRouter>
  );
  
}

export default App;
