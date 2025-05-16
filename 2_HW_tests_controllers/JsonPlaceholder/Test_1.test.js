
const FirstUser = require('./getUser_1.js');
const FirstComment = require('./createComment_2.js');
const CheckTodos = require('./getTodos_3.js');
const FirstPost = require('./createPost_4.js');
const GetAlbumsByID = require('./filterAlbums_5.js');

//1

test('Get first user [/users/1] and verify userId, companyName, street', async () => {
	const response = await FirstUser.getUserById(1);
    expect(response.status).toBe(200);
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
	const postResponse = await FirstComment.createComment(newComment);
	expect(postResponse.status).toBe(201);
	const createdComment = postResponse.data;
	const getResponse = await FirstComment.getCommentById(101);
	expect(getResponse.status).toBe(200);
	const existingComment = getResponse.data;
	const createdKeys = Object.keys(createdComment).sort();
	const existingKeys = Object.keys(existingComment).sort();
	expect(createdKeys).toEqual(existingKeys);

});

//3

test('GET [/todos]: verify status, length, and structure of each todo item', async () => {
	const response = await CheckTodos.getAllTodos();
	expect(response.status).toBe(200);

	const todos = response.data;
	CheckTodos.validateTodosList(todos);
	console.log('Successfully tested 200 todos with the structure:', Object.keys(todos[0]));
});


//4

test('Create new post [/posts] and verify type of each property', async () => {
    const post = {
        userId: 11,
        id: 101, 
        title: 'What is not tested does not exist.',
        body: 'Tests do not prove the absence of errors, but they do prove the presence of testing.'
    };

    const response = await FirstPost.newPost(post);
    expect(response.status).toBe(201); 
	FirstPost.validatePostStructure(response.data);
    const responseBody = response.data;
	console.log(response.data);
});


//5

test('GET /albums: verify status and that 10 albums have userId = 10', async () => {
    const response = await GetAlbumsByID.getAlbums();
    expect(response.status).toBe(200);
    const albums = GetAlbumsByID.filterAlbumsByUserId(response.data,10);
   GetAlbumsByID.validateAlbumsByUserId(albums,10);

    console.log('Found 10 albums with userId = 10');
});

