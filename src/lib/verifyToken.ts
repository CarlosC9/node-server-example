import jwt from 'jsonwebtoken';
import UserDatabase from '../database/users.database';

export function verifyToken(req : any, res : any, next: any ) {
    if (!req.headers.authorization) {
        return res.status(500).send('Unauthorization');
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(500).send('Unauthorization');
    }

    const payload : any = jwt.verify(token, 'secretKey');
    req.userId = payload._id;

    const user = UserDatabase.findUserById(req.userId);
    if(!user) {
        return res.status(500).send('Unauthorization');
    }

    next();
}