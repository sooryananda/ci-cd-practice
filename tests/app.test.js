
const request = require('supertest');
const { app, resetTasks } = require('../app');

beforeEach(() => {
    resetTasks();
});

describe('Task Manager API Tests', () => {

    // Test 1: Home route
    test('GET / should return welcome message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Welcome to Task Manager API');
    });

    // Test 2: Health check
    test('GET /health should return UP', async () => {
        const response = await request(app).get('/health');

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('DOWN');
    });

    // Test 3: Get all tasks
    test('GET /tasks should return all tasks', async () => {
        const response = await request(app).get('/tasks');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(2);
    });

    // Test 4: Get task by ID
    test('GET /tasks/1 should return the correct task', async () => {
        const response = await request(app).get('/tasks/1');

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('Learn Node.js');
    });

    // Test 5: Task not found
    test('GET /tasks/99 should return 404', async () => {
        const response = await request(app).get('/tasks/99');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Task not found');
    });

    // Test 6: Create a task
    test('POST /tasks should create a new task', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: 'Learn GitHub Actions' });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe('Learn GitHub Actions');
        expect(response.body.completed).toBe(false);
    });

    // Test 7: Reject empty task
    test('POST /tasks should reject an empty title', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({ title: '' });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Task title is required');
    });

});
