const axios = require('axios');

// const BASE_URL = 'https://jsonplaceholder.typicode.com';

//1
// const getUserById = (id) => {
//     return axios.get(`${BASE_URL}/users/${id}`);
// };

// controllers/AccountController.js

class AccountController {
	constructor() {
		this.axiosInstance = axios.create({
			baseURL: 'https://bookstore.toolsqa.com',
		});
	}
	generateNewUser() {
		return {
			password: 'Qwerty123!l',
			userName: `lenalemo_${Date.now()}`
		};
	}
	async createUser(userName, password) {
		return await axios.post(`${this.baseUrl}/Account/v1/User`, {
			userName,
			password,
		});
	}

	validateCreateUserResponse(data, expectedStatus = 201) {
		expect(data).toHaveProperty('userID');
		expect(typeof data.userID).toBe('string');

		expect(data).toHaveProperty('username');
		expect(typeof data.username).toBe('string');
	}
}

module.exports = new AccountController();




// 	validateCreateUserResponse(data) {
// 		expect(data).toHaveProperty('userID');
// 		expect(typeof data.userID).toBe('string');
// 		expect(data).toHaveProperty('username');
// 	}
// }

// module.exports = new AccountController();






//2
const sampleComment = {
    name: 'Test Name',
    email: 'test@example.com',
    body: 'This is a test comment.',
    postId: 101,
};

const createComment = (commentData) => {
    return axios.post(`${BASE_URL}/comments`, commentData);
};

const getCommentById = (id) => {
    return axios.get(`${BASE_URL}/comments/${id}`);
};
//3
const getTodos = () => {
    return axios.get(`${BASE_URL}/todos`);
};

const validateTodoStructure = (todo) => {
    expect(todo).toHaveProperty('userId');
	expect(todo).toHaveProperty('id');
	expect(todo).toHaveProperty('title');
	expect(todo).toHaveProperty('completed');

	expect(typeof todo.userId).toBe('number');
	expect(typeof todo.id).toBe('number');
	expect(typeof todo.title).toBe('string');
	expect(typeof todo.completed).toBe('boolean');
};

const validateTodosList = (todos, expectedLength = 200) => {
	expect(todos.length).toBe(expectedLength);
	todos.forEach(validateTodoStructure);
}
//4


// const createPost = (postData) => {
//     return axios.post(`${BASE_URL}/posts`, postData);
// };

// const getAlbums = () => {
//     return axios.get(`${BASE_URL}/albums`);
// };

class PostController {
	constructor() {
		this.axiosInstance = axios.create({
			baseURL: 'https://jsonplaceholder.typicode.com'
		});
	}

	async createPost(postData) {
		const response = await this.axiosInstance.post('/posts', postData);
		return response;
	}

	validatePostTypes(post) {
		expect(typeof post.userId).toBe('number');
		expect(typeof post.id).toBe('number');
		expect(typeof post.title).toBe('string');
		expect(typeof post.body).toBe('string');
	}
}

module.exports = new PostController();

// module.exports = {
//     getUserById,
//     createComment,
//     getCommentById,
//     sampleComment,
//     getTodos,
//     validateTodoStructure,
//     validateTodosList

// }