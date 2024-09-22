const express = require('express');
const path = require('path');
const mysql = require('mysql2'); // Import MySQL
const app = express();
const port = 3000;

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json()); // For JSON data

// Serve static files
app.use(express.static(path.join(__dirname, 'farm-management')));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'T@tenda24',
    database: 'farm_management'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'farm-management', 'index.html'));
});

// Registration
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (name && email && password) {
        // Insert user into MySQL database
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        connection.query(sql, [name, email, password], (err, results) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.send('Error occurred while registering.');
                return;
            }
            res.redirect('/dashboard'); // Redirect to dashboard
        });
    } else {
        res.send('Please fill all fields!');
    }
});

// Handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {

        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        connection.query(sql, [email, password], (err, results) => {
            if (err) {
                console.error('Error querying user:', err);
                res.send('Error occurred during login.');
                return;
            }
            if (results.length > 0) {
                res.redirect('/dashboard'); // Redirect to dashboard
            } else {
                res.send('Invalid email or password!');
            }
        });
    } else {
        res.send('Please fill all fields!');
    }
});

// Data submission from the dashboard form
app.post('/add-data', (req, res) => {
    const { dataType, dataValue } = req.body;

    if (dataType && dataValue) {
        // Insert form data into MySQL (you can change the table name and columns as needed)
        const sql = 'INSERT INTO farm_data (data_type, data_value) VALUES (?, ?)';
        connection.query(sql, [dataType, dataValue], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.send('Error occurred while submitting data.');
                return;
            }
            console.log('Data added:', { dataType, dataValue });
            res.redirect('/dashboard'); // Redirect back to the dashboard
        });
    } else {
        res.send('Please fill in all fields.');
    }
});

// Serve the dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'farm-management', 'dashboard.html'));
});

//  The server
app.listen(port, () => {
    console.log(`Server running at http://localhost:3000/`);
});