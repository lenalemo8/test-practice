// const BaseController = require("./BaseController");

// class AccountController extends BaseController {

//     async getAuthToken(userName, password) {
//         const response = await this.axiosInstance.post('/Account/v1/GenerateToken', {
//             "userName": userName,
//             "password": password
//         });
//         return response.data.token;
//     }

//     async getUserId(userName, password) {
//         const response = await this.axiosInstance.post('/Account/v1/Login', {
//             "userName": userName,
//             "password": password
//         });
//         return response.data.userId;
//     }
// }

// module.exports = new AccountController();

