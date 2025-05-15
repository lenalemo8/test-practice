const axios = require('axios').default;

test('Get all posts [/posts] and verify number', async () => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
	const responseBody = response.data;
	expect(responseBody).toHaveLength(100);
});

test('Get first post [/posts/1] and verify userId, id, title', async () => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
	const responseBody = response.data;
	expect(responseBody.userId).toBe(1);
	expect(responseBody.id).toBe(1);
	expect(responseBody.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
});

test.only('Create new post [/posts] and verify response is successful', async () => {
	const newPost = {
		title: 'New post',
		body: 'sfafsafasf saf asf asf sa fas f',
		userId: 1,
	};

	const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
	const responseData = response.data;
	expect(response.status).toBe(201);
	expect(responseData.id).toBe(101);
	expect(responseData.userId).toBe(newPost.userId);
	expect(responseData.body).toBe(newPost.body);
	expect(responseData.title).toBe(newPost.title);
	// axios.request({
	//     method: 'GET',
	//     url: 'https://jsonplaceholder.typicode.com/posts',
	// })
});
