import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignOut from './components/UserSignOut';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import Header from './components/Header';
import withContext from './Context.js';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/NotFound'
import Forbidden from './components/Forbidden';
import UnHandledError from './components/UnHandledError';

const UserCoursesWithContext = withContext(Courses);
const UserHeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserCreateCourseWithContext = withContext(CreateCourse);
const UserUpdateCourseWithContext = withContext(UpdateCourse);
const UserCourseDetailWithContext = withContext(CourseDetail);



const App = () => {
 
  return (
  <Router>
    <div>
      <UserHeaderWithContext />
      <Switch>
        <Redirect exact from="/" to="/courses" />
        <Route exact path="/courses" component={UserCoursesWithContext} />
        <PrivateRoute path="/courses/create" component={UserCreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UserUpdateCourseWithContext} />
        <Route path="/courses/:id" component={UserCourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnHandledError} />

        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
  );
  
}

export default App;