import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import itemRoute from '../src/routes/items-route.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Resolve the current file's directory path for use in serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Serve static assets from public directory
app.use(express.static(path.join(__dirname, '../public')));

//middleware to parse incoming request bodies in URL-encoded format and JSON format
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//ejs directory setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//route for all items
app.use('/', itemRoute);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = error.status || 500;
    res.status(statusCode).json({error: err.message || 'Something went wrong!'});
});

//Start the server and listen to what port the server is running on
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on ${process.env.PORT || 3000}`);
});