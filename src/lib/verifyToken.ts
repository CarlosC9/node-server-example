import jwt from 'jsonwebtoken'

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
    next();
}