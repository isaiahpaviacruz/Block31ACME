// imports here for express and pg

// static routes here (you only need these for deployment)

// app routes here

// create your init function

// init function invocation

const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL client setup
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/api/employees', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static assets
app.use(express.static(path.join(__dirname, '../dist')));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
