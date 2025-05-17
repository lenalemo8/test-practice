const axios = require('axios').default;

export class BaseService {
    constructor() {
        this.axiosInstance = axios.create({
            validateStatus: function () {
                return true;
            },
            
           baseURL: 'https://bookstore.toolsqa.com'
        })
    }
}

