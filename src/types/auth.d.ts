export interface IssueJWTBody {
    payload: {
        userId: string;
        date: number;
    };
    expiresIn: string;
}

export interface jwtToken {
    token: string;
    expiresIn: string;
}

export interface DecodedToken {
    userId: string;
    date: number,
    iat: number,
    exp: number
}