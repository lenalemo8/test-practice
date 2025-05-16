const axios = require('axios').default;

//1 

test('POST /Account/v1/User - Creating a new user', async () => {
	const newUser = {
	  password: 'Qwerty123!l',
	  userName: `lenalemo_${Date.now()}`
	};
  
	const response = await axios.post('https://bookstore.toolsqa.com/Account/v1/User', newUser);
	const userID = response.data.userID;
	const userName = response.data.username
	expect(response.status).toBe(201);
	expect(response.data).toHaveProperty('userID');
	expect(typeof response.data.userID).toBe('string');
	expect(response.data).toHaveProperty('username');
	console.log(userName);
	console.log(userID);
  });


//2

test('POST /Account/v1/GenerateToken - Generate token', async () => {
	const credentials = {
	  userName: 'lenalemo',
	  password: 'Qwerty123!l'
	};
  
	const response = await axios.post('https://bookstore.toolsqa.com/Account/v1/GenerateToken', credentials);
	expect(response.status).toBe(200);
	const userToken = response.data.token;
	console.log(userToken);
	expect(response.data).toHaveProperty('token');
	expect(response.data).toHaveProperty('expires');
	expect(response.data).toHaveProperty('status');
	expect(response.data).toHaveProperty('result');
	expect(response.data.token).not.toBeNull();
  });


//3 ('https://bookstore.toolsqa.com/Account/v1/Authorized')

test('POST /Account/v1/Authorized - Login', async () => {
	const myUser = {
	  password: 'Qwerty123!l',
	  userName: 'lenalemo'
	};
  
	const response = await axios.post('https://bookstore.toolsqa.com/Account/v1/Authorized', myUser);
	const responseBody = response.data;
	expect(response.status).toBe(200);
	expect(response.data).toBe(true);
	console.log(responseBody);
  });


//4 (Authorization - 'https://demoqa.com/Account/v1/Login')

test('POST /Account/v1/Login - Login', async () => {
	const myUser = {
	  password: 'Qwerty123!l',
	  userName: 'lenalemo'
	};
  
	const response = await axios.post('https://demoqa.com/Account/v1/Login', myUser);
	//const userID = response.data.userId;
	const responseBody = response.data;
	expect(response.status).toBe(200);
	expect(response.data).toHaveProperty('userId');
	expect(response.data).toHaveProperty('username');
	expect(response.data).toHaveProperty('password');
	expect(response.data).toHaveProperty('token');
	expect(response.data).toHaveProperty('expires');
	expect(response.data).toHaveProperty('created_date');
	expect(response.data).toHaveProperty('isActive');
	console.log(responseBody);
  });

//5 ('Add the book')

test('POST /Account/v1/User - Adding new book to user', async () => {
	const responseToken = await axios.post('https://bookstore.toolsqa.com/Account/v1/GenerateToken', {
        "userName": 'lenalemo',
        "password": 'Qwerty123!l'
    },
        {
            validateStatus: function () {
                return true;
            }
        });

    const response = await axios.post('https://bookstore.toolsqa.com/BookStore/v1/Books', {
        "userId": "71729589-131f-4151-ba83-12dde54e8140",
        "collectionOfIsbns": [
            {
                "isbn": "9781449325862"
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

// 6 ('Delete the book')

test('DELETE /BookStore/v1/Book - Removing my book', async () => {
   
    const responseToken = await axios.post('https://bookstore.toolsqa.com/Account/v1/GenerateToken', {
        'userName': 'lenalemo',
        'password': 'Qwerty123!l'
		},

        {
            validateStatus: function () {
                return true;
            }
        });

    const response = await axios.delete('https://bookstore.toolsqa.com/BookStore/v1/Book?isbn=9781449325862&userId=71729589-131f-4151-ba83-12dde54e8140',
			{
			data: {
				'isbn': '9781449325862',
				'userId': '71729589-131f-4151-ba83-12dde54e8140'
			},	
            headers: {
                'Authorization': `Bearer ${responseToken.data.token}`
            },
            validateStatus: () => true
        });
    const responseBody = response.data;
	expect(response.status).toBe(204); 
	console.log('The book was successfully removed:',response.status);
});
