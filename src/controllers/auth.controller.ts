/**
 * @param {*} payload - Each entity sends the payload it wants to save in the JWT token
 * @param {*} expiresIn - each Entity decides the timeframe for expiration
 */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { IssueJWTBody } from '../types/auth';
import { CustomRequest } from '../types/customTypes';

interface TypedRequestBody<T> extends Request {
    body: T;
}



const issueJWT = (req: TypedRequestBody<IssueJWTBody> , res: Response): void => {
    
    const pathToKey: string = path.join(__dirname, '../certs', 'private.pem');
    const PRIV_KEY: string = fs.readFileSync(pathToKey, 'utf8');

    
    const body: IssueJWTBody = req.body;

    const signedToken: string = jwt.sign(body.payload, PRIV_KEY, { expiresIn: body.expiresIn, algorithm: 'RS256' });
    res.status(200).send({
        success: true, 
        msg: 'Token has been issued', 
        data: { 
            token: `Bearer ${signedToken}`, 
            expires: body.expiresIn
    }})

}

const checkToken = async(req: CustomRequest, res: Response) => {
    let publicKEY: string | undefined;
    
        publicKEY = fs.readFileSync(path.join(__dirname, '../certs', 'public.pem'), 'utf8');

    
        let token:string | string [] | undefined = req.headers['x-access-token'] || req.headers['authorization'];
   
        
        if (token && typeof(token) === 'string') {
            token = token.split(" ")[1]
            // Add a property to req object
            req.decoded = jwt.verify(token, publicKEY);

        // Use req.decoded or perform other actions
        if (req.decoded) {
            res.send({ success: true, data: req.decoded });
        } else {
            res.status(401).json({ success: false, message: 'Unauthorized' });
        }
    } else {
        console.log(token);
        
        res.status(401).send({success: false, msg: 'Either authorization header not present or its not of type string'})
    }
}


const checkIfCurrentUser = (req: Request<{ body:{id: string}, userId: string }>, res: Response) => {
    
        //only the current user can access this route
        if (req.body.id == req.params.userId) {
            return res.status(200).send({auth:true})
        }
        //if it is not the current user, return unauthorized
        return res.status(401).json({
                success: false,
                message: 'You can not access a user with this id'
            })
            //if a user does not have user role, return unauthorized

}

export { 
    issueJWT, 
    checkToken,
    checkIfCurrentUser
}