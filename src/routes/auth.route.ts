import { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Router } from 'express';
import * as auth from '../controllers/auth.controller';

dotenv.config();

const authRoutes = (app: Application): void => {
    const router = Router();

    // Define your routes here
    // For example:
    router.get('/test', (req: Request, res: Response) => {
        res.send('success')
    })
    router.post('/issuejwt', auth.issueJWT);
    router.get('/checktoken', auth.checkToken);
    router.post('/checkifcurrentuser/:userId', auth.checkIfCurrentUser);

    app.use('/api/auth', router);
};

export default authRoutes;