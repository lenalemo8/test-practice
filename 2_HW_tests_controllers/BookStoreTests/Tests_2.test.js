const FirstUser = require('./createUser_1');
const AccLogin = require('./authorized_2');
const BooksActivities = require('./bookcontroller_3');


let token;
let bookIsbn;
const data = {
	userName: 'lenalemo',
	password: 'Qwerty123!l'
	};


describe('Book service tests', () => {

	beforeAll(async () => {
		data.userId = await AccLogin.getUserId(data.userName,data.password);
		token = await AccLogin.getAuthToken(data.userName,data.password);
		
		let randomBookIndex = Math.floor(Math.random() * 8);
		const booksResponse = await BooksActivities.getBooksList();
		const booksResponseData = booksResponse.data;
		bookIsbn = booksResponseData.books[randomBookIndex].isbn;
	})

	test('POST /Account/v1/User - Creating a new user', async () => {
		const response = await FirstUser.createUser();
		expect(response.data).toHaveProperty('userID');
		expect(response.data).toHaveProperty('username');
		expect(typeof response.data.userID).toBe('string');
		expect(response.status).toBe(201);
		console.log(response.data);
	
  	});

	test('POST /BookStore/v1/Books - Adding new book to user', async () => {
		const response = await BooksActivities.addBook(data.userId,bookIsbn,token);
		const responseBody = response.data;
		expect(response.status).toBe(201);
		expect(response.data.books[0].isbn).toBe(bookIsbn);
	})

	test('DELETE /BookStore/v1/Book - Removing my book', async () => {
		const response = await BooksActivities.deleteBook(data.userId,token)
		expect(response.status).toBe(204);
	})
})