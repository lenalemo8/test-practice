const { default: axios } = require("axios");
const BaseControll = require("./BaseControll");

class CreateUser extends BaseControll{
    newUser () {
        return {
        password: 'Qwerty123!l',
        userName: `lenalemo_${Date.now().toString().slice(5,10)}`
      }
    };
    async setUser () {
        return await this.axiosInstance.post('/Account/v1/User')
        }
    }
module.exports = new CreateUser();

