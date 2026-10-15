import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import os from 'os';
import userRoutes from './UserRoutes';

const app = express();
const port = process.env.PORT || 3000;
// Connection string comes from the environment so the DB password never lands in Git or the Docker image
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());
// src/public works both from ts-node (src/) and from the compiled build (dist/)
const publicDir = path.join(__dirname, '..', 'src', 'public');
app.use(express.static(publicDir));

// The home page is the login form
app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(publicDir, 'login.html'));
});

// Shows which container answered, to see nginx spreading requests across the web servers
app.get('/host', (req: Request, res: Response) => {
    res.json({ host: os.hostname() });
});

// Routes
app.use('/api', userRoutes);

if (!mongoUri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
