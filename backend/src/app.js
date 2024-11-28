const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');

const AppError = require('./utils/app-error');
const globalErrorHandler = require('./controllers/error-controller');
const userRouter = require('./routes/user-route');
const authRouter = require('./routes/auth-route');

const app = express();

// Middleware Setup

// Enable CORS for specific origin and methods
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));

// Session Management
app.use(session({
    secret: process.env.SESSION_STRING || 'abcdef',
    cookie: { secure: false }, 
    resave: false,
    saveUninitialized: false
}));

// Serve Static Files
app.use(express.static(path.join(__dirname, '../../client/src/')));

// Route to render index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/src/', 'index.html'));
});

// Body Parser for JSON Requests
app.use(express.json({ limit: '10kb' }));

// Routes
app.use(authRouter);
app.use(userRouter);

// Handle Unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
