import config from './config.js';

export default class Data {
    api(path, method = 'GET', body = null){
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
        return fetch(url, options);
    }

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
}