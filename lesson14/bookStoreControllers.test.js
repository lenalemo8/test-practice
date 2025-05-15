const axios = require("axios").default;
const AccountController = require("./api-controllers/AccountController.js");
const BooksController = require('./api-controllers/BooksController.js')

let bookIsbn;
let token;
const user = {
    userName: 'michael-testuser',
    password: '52hPed%s',
}
describe('Books tests', () => {

    beforeAll(async () => {
        user.userId = await AccountController.getUserId(user.userName, user.password);
        let randomBookIndex = Math.floor(Math.random() * 8);
        token = await AccountController.getAuthToken(user.userName, user.password);
        const booksResponse = await BooksController.getAllBooks();
        const booksResponseData = booksResponse.data;
        bookIsbn = booksResponseData.books[randomBookIndex].isbn;

    })

    test('Get all books and verify length [/BookStore/v1/Books]', async () => {
        const response = await BooksController.getAllBooks();
        const responseBody = response.data;
        expect(responseBody.books).toHaveLength(8);
    })

    test('Verify first book title [/BookStore/v1/Books]', async () => {
        const response = await BooksController.getAllBooks();
        const responseBody = response.data;
        expect(responseBody.books[0].title).toBe('Git Pocket Guide');
    })

    test('Add new book to user [/BookStore/v1/Books]', async () => {
        // const responseToken = await AccountController.getAuthToken(user.userName, user.password);
        const response = await BooksController.addBook(user.userId, bookIsbn, token);
        const responseBody = response.data;
        expect(response.status).toBe(201);
        expect(response.data.books[0].isbn).toBe(bookIsbn);
    })

    test('Remove all books [BookStore/v1/Books?UserId=]', async () => {
        // Get token
        // Remove books
        // Verify response
        const response = await BooksController.removeAllBooks(user.userId, token);
        expect(response.status).toBe(204);
    })

    afterAll(async () => {
        const response = await BooksController.removeAllBooks(user.userId, token);
        expect(response.status).toBe(204);
        console.log('All books deleted');
    })
})

describe('Account tests', () => {
    test('Generate token [/Account/v1/GenerateToken]', async () => {
        const response = await AccountController.getAuthToken(user.userName, user.password);

        console.log(response);
    })
})