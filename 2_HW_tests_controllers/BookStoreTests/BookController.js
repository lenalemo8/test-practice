const { BaseService } = require('./BaseService.js');


class BookController extends BaseService {

    async getBooksList() {
        return await this.axiosInstance.get('/BookStore/v1/Books');
    }

    async addBook(userId, isbn, token) {
        return await this.axiosInstance.post('/BookStore/v1/Books', {
            "userId": userId,
            "collectionOfIsbns": [
                {
                    "isbn": isbn
                }
            ]
        },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
    }

    async deleteBook(userId, token) {
        return await this.axiosInstance.delete(`/BookStore/v1/Books?UserId=${userId}`, {
            
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
    }
}

module.exports = new BookController();