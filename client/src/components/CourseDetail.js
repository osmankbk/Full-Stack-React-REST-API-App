//The componenet that displays the contents of a course.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkDown from 'react-markdown';

class CourseDetail extends Component {
    state = {
      courses: [],
      courseUser: '',
      autheUser: this.props.context.authenticatedUser,
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
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{courses.title}</h3>
                <p>{`By ${this.state.courseUser.firstName} ${this.state.courseUser.lastName}`}</p>
              </div>
              <div className="course--description">
                {<ReactMarkDown escapeHtml={false} source={courses.description} />}
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{courses.estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                      {<ReactMarkDown escapeHtml={false} source={courses.materialsNeeded}/>}
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
       return <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100"><span><Link to={this.props.location.pathname + '/update'} className="button">Update Course</Link><a className="button" onClick={this.delete}>Delete Course</a></span><Link to='/' className="button button-secondary">
            Return to List</Link></div>
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
      const userId = this.state.autheUser.id;
      const { courseId } = this.state;
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