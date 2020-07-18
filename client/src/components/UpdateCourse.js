import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const BrowserHistory = require('react-router').default;

class UpdateCourse extends Component {
  state = {
    autheUser: this.props.context.authenticatedUser,
    userId: this.props.context.authenticatedUser.id,
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    courses: [],
    courseId: '',
    courseUser: '',
    errors: []
  }
  componentDidMount() {
    const { context } = this.props;
    let courseId = this.props.match.params.id;
      context.data.getCourse(courseId)
      .then(response => {
        if(response) {
          this.setState({
            courses: response,
            courseId: response.id,
            courseUser: response.User,
            title: response.title,
            description: response.description,
            estimatedTime: response.estimatedTime,
            materialsNeeded: response.materialsNeeded,
          })
          console.log(this.state.userId, this.state.courseUser.id);
        } else {
          this.props.history.push('/notFound');
        }
      }).catch(errors => {
        console.log(errors);
    })
  }
    render() {

      const {
        courseUser,
        errors,
        title,
    description,
    estimatedTime,
    materialsNeeded
         } = this.state;
      

        return (
            <div class="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form>
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Course</h4>
                {<ul>
                  {errors.map((error, i) => 
                    <li key={i}>{error}</li>
                  )}
                </ul>}
                <div><input id="title" name="title" type="text" class="input-title course--title--input" placeholder="Course title..."
                    onChange={this.change} value={title}></input></div>
                <p>{courseUser? `By ${this.state.courseUser.firstName} ${this.state.courseUser.lastName}` : this.props.history.push('/error'), console.log('No course user found!')}</p>
              </div>
              <div class="course--description">
                <div><textarea id="description" name="description" class="" placeholder="Course description..." onChange={this.change} value={description}></textarea></div>
              </div>
            </div>
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" class="course--time--input"
                        placeholder="Hours" onChange={this.change} value={estimatedTime}></input></div>
                  </li>
                  <li class="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" class="" placeholder="List materials..." onChange={this.change} value={materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
          </form>
          <div class="grid-100 pad-bottom"><button class="button" type="submit" onClick={this.submit}>Update Course</button><button class="button button-secondary" onClick={this.cancle}>Cancel</button></div>
        </div>
      </div>
        );
    }
    submit = (event) => {
      event.preventDefault();
      this.updateACourse();
    }
    change = (event) => {
      const name = event.target.name;
      const value = event.target.value
 
      this.setState( () => {
        return {
           [name]: value,
        }
      })
    }

    updateACourse = (event) => {
      const { context } = this.props;
      const emailAddress = this.state.autheUser.emailAddress;
      const password = this.props.context.authPassword;
      const courseUserId = this.state.courseUser.id;
      const { userId } = this.state;
      const {
        courseId,
        title,
        description,
        estimatedTime,
        materialsNeeded
         } = this.state;

         const course = {
           courseId,
           title,
           description,
           estimatedTime,
           materialsNeeded,
           courseUserId
         }
      if(courseUserId === userId) {
        context.data.updateCourse(courseId, course, emailAddress, password)
        .then(response => {
          if(!response) {
            let courseId = this.props.match.params.id;
            this.props.history.push(`/courses/${courseId}`);            
          }else if(response && response !== 'course not available') {
            this.setState({
              errors: response,
            })
            console.log(response);
          }
          else if(response && response === 'course not available'){
            this.props.history.push('/notFound');
            console.log(response);
          } else {
            this.props.history.push('/error');
          }
        }).catch(errors => {
          console.log(errors);
        })
      } else {
        this.props.history.push('/forbidden');
      }
    }
    cancle = () =>{
      this.props.history.goBack(); 
    }
}

export default UpdateCourse;