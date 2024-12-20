// src/server.ts
import express from 'express';
import path from 'path';
import hafezRoutes from './routes/hafez';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Routes
app.use('/', hafezRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
    