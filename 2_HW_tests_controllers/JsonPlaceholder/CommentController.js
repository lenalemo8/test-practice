const { BaseController } = require("./BaseController");

class CommentController extends BaseController {
	
	async createComment(newComment) {
		return await this.axiosInstance.post('/comments', newComment);
	};

	async getCommentById(id) {
		return await this.axiosInstance.get(`/comments/${id}`);
	}
}

module.exports = new CommentController();