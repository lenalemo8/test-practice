const { BaseController } = require("./basecontroller_0");

 class UserController extends BaseController {
	async getUserById(id) {
		const response = await this.axiosInstance.get(`/users/${id}`);
		return response;
	}
}
 
module.exports = new UserController();