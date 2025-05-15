const axios = require("axios").default;

test('Get all books and verify length [/BookStore/v1/Books]', async () => {
    const response = await axios.get('https://bookstore.toolsqa.com/BookStore/v1/Books');
    const responseBody = response.data;
    expect(responseBody.books).toHaveLength(8);
})

test('Verify first book title [/BookStore/v1/Books]', async () => {
    const response = await axios.get('https://bookstore.toolsqa.com/BookStore/v1/Books');
    const responseBody = response.data;
    expect(responseBody.books[0].title).toBe('Git Pocket Guide');
})

test('Add new book to user [/BookStore/v1/Books]', async () => {

    const responseToken = await axios.post('https://bookstore.toolsqa.com/Account/v1/GenerateToken', {
        "userName": `michael-testuser`,
        "password": "52hPed%s"
    },
        {
            validateStatus: function () {
                return true;
            }
        });

    const response = await axios.post('https://bookstore.toolsqa.com/BookStore/v1/Books', {
        "userId": "07a44798-a8ae-4eeb-9581-79c87b467a4f",
        "collectionOfIsbns": [
            {
                "isbn": "9781491950296"
            }
        ]
    },
        {
            headers: {
                'Authorization': `Bearer ${responseToken.data.token}`
            },
            validateStatus: function () {
                return true;
            }
        });
    const responseBody = response.data;
    console.log(responseBody);
})

test('Generate token [/Account/v1/GenerateToken]', async () => {
    const response = await axios.post('https://bookstore.toolsqa.com/Account/v1/GenerateToken', {
        "userName": "michael-testuser",
        "password": "52hPed%s"
    },
        {
            validateStatus: function () {
                return true;
            }
        });
    const responseBody = response.data;
    console.log(responseBody.token);
})

test.only('Remove all books [BookStore/v1/Books?UserId=]', async () => {
    // Get token
    // Remove books
    const responseToken = await axios.post(`https://bookstore.toolsqa.com/Account/v1/GenerateToken`, {
        "userName": `michael-testuser`,
        "password": "52hPed%s"
    },
        {
            validateStatus: function () {
                return true;
            }
        });

    const response = await axios.delete('https://bookstore.toolsqa.com/BookStore/v1/Books?UserId=07a44798-a8ae-4eeb-9581-79c87b467a4f',
        {
            headers: {
                'Authorization': `Bearer ${responseToken.data.token}`
            },
            validateStatus: function () {
                return true;
            }
        });
    const responseBody = response.data;
    console.log(responseBody);
})