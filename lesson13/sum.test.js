const sumNumbers = require('./sum');

describe('Successful tests', () => {
	beforeEach(() => {
		console.log('Before each log');
	});

	beforeAll(() => {
		console.log('Before all log');
	});

	afterEach(() => {
		console.log('After each log');
	});

	afterAll(() => {
		console.log('After all log');
	});

	test('Test sumNumbers() - 2+2=4', () => {
		const result = sumNumbers(2, 2);
		expect(result).toBe(4);
	});

	test('Test sumNumbers() - 0+10=10', () => {
		const result = sumNumbers(0, 10);
		expect(result).toBe(10);
	});
});

describe('Failed tests', () => {
	test('Test sumNumbers() - 10+20=30', () => {
		const result = sumNumbers(10, 20);
		expect(result).toBe(0);
	});
});
