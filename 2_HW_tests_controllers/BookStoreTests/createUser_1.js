const { BaseService } = require('./base_0.js');

class User extends BaseService {
    generateUserData () {
        const userName = `lenalemo_${Date.now().toString().slice(5,10)}`;
        const password = 'Qwerty123!l';
        return {userName, password};
    };
    
    async createUser () {
        const {userName, password} = this.generateUserData();
    
        const response = await this.axiosInstance.post('/Account/v1/User',{
            userName,password});

        return response;
    }
};
module.exports = new User();
