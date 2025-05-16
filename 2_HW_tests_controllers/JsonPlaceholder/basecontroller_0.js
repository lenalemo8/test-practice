const axios = require('axios').default;

export class BaseController {
	constructor() {
		this.axiosInstance = axios.create({
			validateStatus: function () {
				return true;
			},
			baseURL: 'https://jsonplaceholder.typicode.com'
		})
	}
	
};
