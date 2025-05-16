const { BaseController } = require("./basecontroller_0");

class CreatePost extends BaseController {
	
	async newPost (postData) {
		return await this.axiosInstance.post('/posts', postData);
	};

	validatePostStructure(post) {
		expect(typeof post.userId).toBe('number');
		expect(typeof post.id).toBe('number');
		expect(typeof post.title).toBe('string');
		expect(typeof post.body).toBe('string');
	}
}
module.exports = new CreatePost();