const express = require('express');

const app = express();

app.use(express.json());

// Temporary in-memory task storage
let tasks = [
    { id: 1, title: 'Learn Node.js', completed: false },
    { id: 2, title: 'Learn Jest', completed: false },
];

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Task Manager API',
    });
});

// Health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
    });
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Get task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({
            error: 'Task not found',
        });
    }

    res.json(task);
});

// Create a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({
            error: 'Task title is required',
        });
    }

    const newTask = {
        id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
        title: title.trim(),
        completed: false,
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Reset tasks for isolated tests
function resetTasks() {
    tasks = [
        { id: 1, title: 'Learn Node.js', completed: false },
        { id: 2, title: 'Learn Jest', completed: false },
    ];
}

module.exports = { app, resetTasks };
