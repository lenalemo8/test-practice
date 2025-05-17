const { BaseService } = require('./base_0.js');


class AccountAuthorization extends BaseService {

    async getAuthToken(userName, password) {
    const response = await this.axiosInstance.post('/Account/v1/GenerateToken', {
        "userName": userName,
        "password": password
    });
        return response.data.token;
    }
    
    async getUserId(userName, password) {
        const response = await this.axiosInstance.post('/Account/v1/Login', {
            userName,
            password
        });
        return response.data.userId;
    }
}
module.exports = new AccountAuthorization();