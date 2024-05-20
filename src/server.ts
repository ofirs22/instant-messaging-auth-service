import express, { Request, Response } from "express";
import authRoutes from './routes/auth.route';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Route is working');
});

authRoutes(app);

app.listen(3030, () => {
    console.log('Server is listening on port 3030');
});

// Error handling middleware
app.use((req: Request, res: Response) => {
    res.status(404).send('Route not found');
});

//

// Error handling middleware for server errors
app.use((err: any, req: Request, res: Response) => {
    console.error(err.stack);
    res.status(500).send('Server error');
});