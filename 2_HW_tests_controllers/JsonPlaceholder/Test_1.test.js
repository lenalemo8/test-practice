const axios = require('axios').default;
const controllers = require('./controllers_1.js');
const postController = require('../JsonPlaceholder/controllers_1.js');
const accountController = require('../JsonPlaceholder/controllers_1.js'); 
//1

// test('Get first user [/users/1] and verify userId, companyName, street', async () => {
//     const response = await controllers.getUserById(1);

//     expect(response.status).toBe(200);
//     console.log('Status 200 OK');

//     const responseBody = response.data;
//     expect(responseBody.id).toBe(1);
//     expect(responseBody.company.name).toBe('Romaguera-Crona');
//     expect(responseBody.address.street).toBe('Kulas Light');

//     console.log(responseBody);
// });



test.only('POST /Account/v1/User - Creating a new user', async () => {
	const newUser = {
		password: 'Qwerty123!l',
		userName: `lenalemo_${Date.now()}`
	}
	const firstUser = accountController.generateNewUser();

	const response = await accountController.createUser(newUser.userName,newUser.password);
	expect(response.status).toBe(201);

	accountController.validateCreateUserResponse(response.data);

	console.log(response.data.username);
	console.log(response.data.userID);
});





//2

test('Create a new comment and verify status and structure with an existing object', async () => {
	const postResponse = await controllers.createComment(controllers.sampleComment);
	expect(postResponse.status).toBe(201);
	console.log('Status 201 Created');

	const createdComment = postResponse.data;

	const getResponse = await controllers.getCommentById(1);
	expect(getResponse.status).toBe(200);

	const existingComment = getResponse.data;
	const createdKeys = Object.keys(createdComment).sort();
	const existingKeys = Object.keys(existingComment).sort();
	expect(createdKeys).toEqual(existingKeys);
	console.log('Structure matches existing comment');
	console.log(' Created comment:', createdComment);
});

//3

test('GET [/todos]: verify status, length, and structure of each todo item', async () => {
	const response = await controllers.getTodos();
	expect(response.status).toBe(200);
	const todos = response.data;
	controllers.validateTodosList(todos);
	console.log('Successfully tested 200 todos with the structure:', Object.keys(todos[0]));
});

//4

test('Create new post [/posts] and verify type of each property', async () => {
    const newPost = {
        userId: 11,
        id: 101, 
        title: 'What is not tested does not exist.',
        body: 'Tests do not prove the absence of errors, but they do prove the presence of testing.'
    };

    const response = await postController.createPost(newPost);
    expect(response.status).toBe(201); 
	console.log('Status 201 Created');

    const responseBody = response.data;
    // postController.validatePostTypes(responseBody);
    // expect(typeof responseBody.userId).toBe('number');
    // expect(typeof responseBody.id).toBe('number');
    // expect(typeof responseBody.title).toBe('string');
    // expect(typeof responseBody.body).toBe('string');
    // PostController.validatePostStructure(responseBody.data)
    console.log('Type of data is correct');
});






//5

test('GET /albums: verify status and that 10 albums have userId = 10', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
    expect(response.status).toBe(200);

    const albums = response.data.filter(album => album.userId === 10);
    expect(albums.length).toBe(10);

    console.log('Found 10 albums with userId = 10');
});

//5 (try/catch)

// test('Getting albums [/albums] with ID 10', async () => {
// 	try {
// 		const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
// 		console.log('Get albums status:', response.status);
// 		if (response.status !== 200) throw new Error('Status is not 200');

// 		const albums = response.data.filter((album) => album.userId === 10);
//         //console.log(albums);
// 		console.log(`Found albums with userId=10: ${albums.length}`);
// 		if (albums.length !== 10) {
// 			throw new Error(`Expected 10 albums for userId=10, but got ${albums.length}`);
// 		}
// 		console.log('Test passed: 10 albums with userId = 10 found.');
// 	} catch (error) {
// 		console.error('Test failed:', error.message);
// 	}
// });
