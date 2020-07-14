import React, { Component } from 'react';

class CreateCourse extends Component {
    state = {
      autheUser: this.props.context.authenticatedUser,
      userId: this.props.context.authenticatedUser.id,
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
      
    }

   render() {
      const {
         title, 
        description,
        estimatedTime, 
        materialsNeeded,
        errors } = this.state;
        
       return(
        <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
       { errors.length ? <div>
        <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              {<ul>
               { errors.map( (error, i) => <li key={i}>{error}</li>) }
              </ul>}
            </div>
          </div> : null }
         
          <form onSubmit={this.submit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                   onChange={this.change} value={title}></input></div>
                <p>{`By ${this.state.autheUser.firstName} ${this.state.autheUser.lastName}`}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.change} value={description}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" onChange={this.change} value={estimatedTime}></input></div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.change} value={materialsNeeded}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button></div>
          </form>
        </div>
      </div>
       );
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
   submit = (event) => {
    event.preventDefault();
    this.handleSubmit();
   }
   handleSubmit = () => {
     const { context } = this.props;
     const { emailAddress } = context.authenticatedUser;
     const password = context.authPassword;

    const { 
      courseId,
      userId,
      title, 
      description, 
      estimatedTime, 
      materialsNeeded,
      errors
    } = this.state;

    const course = {
      courseId,
      userId,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    }
    context.data.createCourse(course, emailAddress, password)
    .then(errors => {
      if(errors.length) {
        this.setState({ errors });
      } else {
        console.log(`${title} is SUCCESSFULLY created!`);
        this.props.history.push(`/`);
      }
    }).catch(err => {
      console.log(err);
      this.props.history.push('/error');
    });
   }

   cancel = () => {
    this.props.history.push('/');
   }
}

export default CreateCourse;