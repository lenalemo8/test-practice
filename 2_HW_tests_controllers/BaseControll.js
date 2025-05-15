const axios = require('axios').default;

class BaseControll {
    constructor() {
        this.axiosInstance = axios.create({
            validateStatus: function () {
                return true;
            },
           baseURL: 'https://bookstore.toolsqa.com'
        })
    }
}
module.exports = new BaseControll();

