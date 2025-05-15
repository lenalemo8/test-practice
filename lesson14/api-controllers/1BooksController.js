// const BaseController = require("./BaseController");


// class BooksController extends BaseController {

//     async getAllBooks() {
//         return await this.axiosInstance.get('/BookStore/v1/Books');
//     }

//     async addBook(userId, isbn, token) {
//         return await this.axiosInstance.post('/BookStore/v1/Books', {
//             "userId": userId,
//             "collectionOfIsbns": [
//                 {
//                     "isbn": isbn
//                 }
//             ]
//         },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//             });
//     }

//     async removeAllBooks(userId, token) {
//         return await this.axiosInstance.delete(`https://bookstore.toolsqa.com/BookStore/v1/Books?UserId=${userId}`,
//             {
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//             });
//     }
// }

// module.exports = new BooksController();