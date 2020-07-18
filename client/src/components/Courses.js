import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {   
    state = {
      course1: [],
      course2: [],
      course3: [],
    }
    
    componentDidMount() {
      this.getFirstCourse(1);
      this.getSecondCourse(2);
      this.getThirdCourse(3);
    }

    getFirstCourse = (courseId) => {
      const { context } = this.props;
      context.data.getCourse(courseId)
      .then(response => {
        if(response !== 'course not available') {
          this.setState({
            course1: response,
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

    getSecondCourse = (courseId) => {
      const { context } = this.props;
      context.data.getCourse(courseId)
      .then(response => {
        if(response) {
          this.setState({
            course2: response,
          })
        } else {
          this.props.history.push('/error');
        }
      }).catch(errors => {
        console.log(errors);
      })
    }

    getThirdCourse = (courseId) => {
      const { context } = this.props;
      context.data.getCourse(courseId)
      .then(response => {
        if(response) {
          this.setState({
            course3: response,
          })
        } else {
          this.props.history.push('/error');
        }
      }).catch(errors => {
        console.log(errors);
      })
    }


    render() {
      const { course1, course2, course3 } = this.state;
        return (
            <div className="bounds">
            <Link to='/courses/1'><div className="grid-33"><a className="course--module course--link" href="course-detail.html">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course1.title}</h3>
              </a></div></Link>
            <Link to='/courses/2'><div className="grid-33"><a className="course--module course--link" href="course-detail.html">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course2.title}</h3>
              </a></div></Link>
              <Link to='/courses/3'><div className="grid-33"><a className="course--module course--link" href="course-detail.html">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course3.title}</h3>
              </a></div></Link>
            <div className="grid-33"><Link to="/courses/create"><a className="course--module course--add--module" href="create-course.html">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                  </svg>New Course</h3>
              </a></Link></div>
          </div>
        );
    }
}

export default Courses;