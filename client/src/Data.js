//This file contains all my HTTP functions

import config from './config.js';

export default class Data {
//The DRY HTTP func call for all my HTTP POST/GET requests    
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null){
        const url = config.apiBaserUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if(body !== null) {
            options.body = JSON.stringify(body);
        }
        if(requiresAuth) {
            const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        return fetch(url, options);
    }

//Authenticatin request func
    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, { emailAddress, password });
        if(response.status === 200) {
            return response.json().then(data => data);
        } else if(response.status === 404) {
            return null;
        } else {
            throw new Error();
        }
    }
//Creating a user func
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if(response.status === 201) {
            return [];
        } else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            })

        } else {
            throw new Error();
        }
    }

//Getting all courses func 
    async getCourses() {
        const response = await this.api(`/courses`, 'GET');
        if(response.status === 200) {
            return response.json().then(data => data);
        } else {
            throw new Error();
        }
    }
//Getting a course func
    async getCourse(courseId) {
        const response = await this.api(`/courses/${courseId}`, 'GET');
        if(response.status === 200) {
            return response.json().then(data => data);
        } else if(response.status === 404) {
            return response.json().then(data => {
                return data.error;
            })
        } else {
            throw new Error();
        }
    }

//Creating a course func    
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
        if(response.status ===  201) {
            return [];
        } else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

//Updating a course func
    async updateCourse(courseId, course, emailAddress, password) {
        const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, { emailAddress, password });
        if(response.status === 204) {
            return null;
        } else if(response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else if(response.status === 404) {
            return response.json().then(data => {
                return data.error;
            });
        }else {
            throw new Error();
        }

    }

//Deleting a course func
    async deleteCourse(courseId, emailAddress, password) {
        const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {emailAddress, password});
        if(response.status === 204) {
            return null;
        } else if(response.status === 403 || response.status === 401) {
            return response.json().then(data => {
                return data.errors;
            })
        } else {
            throw new Error();
        }
    }
}