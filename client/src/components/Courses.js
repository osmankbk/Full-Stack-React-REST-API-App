//This holds the list of courses on my page. 

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {   
    state = {
      courses: [],
      
    }
//When this component mounts it automatically makes a get request for the first three courses in my database   
    componentDidMount() {
      this.getAllCourse();
      
    }

    getAllCourse = () => {
      const { context } = this.props;
      context.data.getCourses()
      .then(response => {
        if(response) {
          this.setState({
            courses: response,
          })
        }else {
          this.props.history.push('/error');
        }
      }).catch(errors => {
        console.log(errors);
      })
    }


    render() {
      
      const courses = this.state.courses.map((course, i) => 
        <div className="grid-33" key={i}><Link to={`/courses/${course.id}`} className="course--module course--link">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
      </Link></div>
      )
        return (
            <div className="bounds"> 
              {courses}
            <div className="grid-33"><Link to="/courses/create" className="course--module course--add--module">
                <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add">
                    <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                  </svg>New Course</h3>
              </Link></div>
          </div>
        );
    }


}

export default Courses;