const { BaseController } = require("./BaseController");


class Todos extends BaseController {
	
	async getAllTodos() {
		return await this.axiosInstance.get('/todos');
	};

	validateTodoStructure(todo) {
		expect(todo).toHaveProperty('userId');
		expect(todo).toHaveProperty('id');
		expect(todo).toHaveProperty('title');
		expect(todo).toHaveProperty('completed');

		expect(typeof todo.userId).toBe('number');
		expect(typeof todo.id).toBe('number');
		expect(typeof todo.title).toBe('string');
		expect(typeof todo.completed).toBe('boolean');
	};
    validateTodosList(todos, expectedLength = 200) {
		expect(todos.length).toBe(expectedLength);
		todos.forEach(this.validateTodoStructure);
	}
}
module.exports = new Todos();