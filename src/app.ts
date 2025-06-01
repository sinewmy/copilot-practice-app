import express, { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;

// Game state
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Simple in-memory user session
let loggedInUser: string | null = null;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // For demo: accept any username/password, but require both
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }
    loggedInUser = username;
    res.send(`Logged in as ${username}. You can now play the game.`);
});

// Middleware to check login
function requireLogin(req: Request, res: Response, next: NextFunction) {
    if (!loggedInUser) {
        return res.status(401).send('Please log in first.');
    }
    next();
}

// Start or reset the game
app.get('/start', requireLogin, (req, res) => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    res.send('New game started! Guess a number between 1 and 100 by POSTing to /guess.');
});

// Guess endpoint
app.post('/guess', requireLogin, (req, res) => {
    const guess = Number(req.body.guess);
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
        return res.status(400).send('Please provide a valid number between 1 and 100.');
    }

    if (guess === secretNumber) {
        const message = `Correct! The number was ${secretNumber}. You guessed it in ${attempts} attempts.`;
        // Reset for next game
        secretNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        return res.send(message + ' New game started!');
    } else if (guess < secretNumber) {
        return res.send('Too low! Try again.');
    } else {
        return res.send('Too high! Try again.');
    }
});

// Logout endpoint
app.post('/logout', (req, res) => {
    loggedInUser = null;
    res.send('You have been logged out.');
});

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Guess the Number Game! Start a new game at /start.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});