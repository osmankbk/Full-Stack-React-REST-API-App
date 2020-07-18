import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkDown = require('react-markdown');

class CourseDetail extends Component {
    state = {
      courses: [],
      courseUser: '',
      autheUser: this.props.context.authenticatedUser,
      userId: this.props.context.authenticatedUser.id,
      courseId: '',
    }

    componentDidMount() {
      const { context } = this.props;
      let courseId = this.props.match.params.id;
        context.data.getCourse(courseId)
        .then(response => {
          if(response !== 'course not available') {
            this.setState({
              courses: response,
              courseUser: response.User,
              courseId: response.id,
            })
          } else if(response === 'course not available') {
            this.props.history.push('/NotFound');
          }else {
            this.props.history.push('/error');
          }
        }).catch(errors => {
          console.log(errors);
      })
    }
    render() {
      const { courses } = this.state;      
        return (
          <div>
            { this.restrictAccess() }
          <div class="bounds course--detail">
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Course</h4>
                <h3 class="course--title">{courses.title}</h3>
                <p>{`By ${this.state.courseUser.firstName} ${this.state.courseUser.lastName}`}</p>
              </div>
              <div class="course--description">
                {<ReactMarkDown source={courses.description} />}
              </div>
            </div>
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{courses.estimatedTime}</h3>
                  </li>
                  <li class="course--stats--list--item">
                    <h4>Materials Needed</h4>
                      {<ReactMarkDown sourse={courses.materialsNeeded}/>}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        );
    }

    restrictAccess = () => {
      const authUser = this.props.context.authenticatedUser;
      
      if(authUser && this.state.courseUser.id === authUser.id) {
       return <div class="actions--bar">
        <div class="bounds">
          <div class="grid-100"><span><Link to={this.props.location.pathname + '/update'}><a class="button" href="update-course.html">Update Course</a></Link><a class="button" onClick={this.delete}>Delete Course</a></span><Link to='/'><a
              class="button button-secondary" href="index.html">Return to List</a></Link></div>
        </div>
      </div>
      } else {
        return null;
      }
    }
    delete = (event) => {
      event.preventDefault();
      this.deleteACourse();
    }

    deleteACourse = () => {
      const { context } = this.props;
      const emailAddress = this.state.autheUser.emailAddress;
      const password = this.props.context.authPassword;
      const courseUserId = this.state.courseUser.id;
      const { userId, courseId } = this.state;
      if(userId === courseUserId) {
        context.data.deleteCourse(courseId, emailAddress, password)
        .then(response => {
          if(response) {
            this.props.history.push('/forbidden');
            console.log(response);
          } else{
            this.props.history.push('/');
          }
        }).catch(errors => {
          console.log(errors);
        })
      } else {
        this.props.history.push('/forbidden');
      }
    }
    
}

export default CourseDetail;