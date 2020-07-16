import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
    state = {
      courses: [],
      courseUser: ''
    }

    componentDidMount() {
      const { context } = this.props;
      let courseId = this.props.match.params.id;
        context.data.getCourse(courseId)
        .then(response => {
          if(response) {
            this.setState({
              courses: response,
              courseUser: response.User,
            })
          } else {
            this.props.history.push('/notFound');
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
                <p>{courses.description}</p>
                
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
                   <ul>
                      <li>{courses.materialsNeeded}</li>
                    </ul>
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
          <div class="grid-100"><span><Link to={this.props.location.pathname + '/update'}><a class="button" href="update-course.html">Update Course</a></Link><a class="button" href="#">Delete Course</a></span><Link to='/'><a
              class="button button-secondary" href="index.html">Return to List</a></Link></div>
        </div>
      </div>
      } else {
        return null;
      }
    }
    

}

export default CourseDetail;