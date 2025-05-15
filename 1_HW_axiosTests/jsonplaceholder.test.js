const axios = require('axios').default;

//1

test('Get first user [/users/1] and verify userId, companyName, street', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');

    expect(response.status).toBe(200);
    console.log('Status 200 OK');

    const responseBody = response.data;
    expect(responseBody.id).toBe(1);
    expect(responseBody.company.name).toBe('Romaguera-Crona');
    expect(responseBody.address.street).toBe('Kulas Light');

    console.log(responseBody);
});

//2

test('Create a new comment and verify status and structure with an existing object', async () => {
	const newComment = {
		name: 'Test Name',
		email: 'test@example.com',
		body: 'This is a test comment.',
		postId: 101,
	};

	const postResponse = await axios.post('https://jsonplaceholder.typicode.com/comments', newComment);
	expect(postResponse.status).toBe(201);
	console.log('Status 201 Created');

	const createdComment = postResponse.data;

	const getResponse = await axios.get('https://jsonplaceholder.typicode.com/comments/1');
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
	const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
	expect(response.status).toBe(200);

	const todos = response.data;
	expect(todos.length).toBe(200);
	todos.forEach((todo) => {
		expect(todo).toHaveProperty('userId');
		expect(todo).toHaveProperty('id');
		expect(todo).toHaveProperty('title');
		expect(todo).toHaveProperty('completed');

		expect(typeof todo.userId).toBe('number');
		expect(typeof todo.id).toBe('number');
		expect(typeof todo.title).toBe('string');
		expect(typeof todo.completed).toBe('boolean');
	});

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

    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    expect(response.status).toBe(201); 
	console.log('Status 201 Created');

    const responseBody = response.data;

    expect(typeof responseBody.userId).toBe('number');
    expect(typeof responseBody.id).toBe('number');
    expect(typeof responseBody.title).toBe('string');
    expect(typeof responseBody.body).toBe('string');

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
