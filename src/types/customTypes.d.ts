import { Request } from 'express';
import { DecodedToken } from './auth'; // Assuming you have a types file with DecodedToken interface

// Extend the Request interface to include the 'decoded' property
interface CustomRequest extends Request {
    decoded?: string | JwtPayload | DecodedToken; // DecodedToken is an interface representing the decoded JWT token
}