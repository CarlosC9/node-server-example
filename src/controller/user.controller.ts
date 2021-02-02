import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserDatabase from '../database/users.database'

const saltRounds = 10;

export default class UserController {

    static async signUpUser(req: Request, res: Response) {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Bad Request: Username or password is null or password.");
        }
        username = username.toLowerCase();
        try {
            const passwordHash = await bcrypt.hash(password, saltRounds);
            const newUser = await UserDatabase.createUser(username, passwordHash);
            const token = jwt.sign({ _id: newUser.id }, 'secretKey');
            return res.status(200).json({ token });
        } catch (e) {
            if (e.errno == 1062) {
                return res.status(403).send("Forbidden: The username already exists.")
            }
            console.log(e);
            return res.status(500).send("Internal Server Error.");
        }
    }
    
    static async signInUser(req: Request, res: Response) {
        let { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send("Bad Request: Username or password is null or password.");
        }
        username = username.toLowerCase();
        try {
            const user = await UserDatabase.findUserByUsername(username);
            if (!user) {
                return res.status(404).send("Not Found: The username not exist.");
            }
            const bcryptCompare = await bcrypt.compare(password, user.passwd);
            if (bcryptCompare) {
                const token = jwt.sign({ _id: user.id }, 'secretKey');
                return res.status(200).json({token});
            } else {
                return res.status(401).send("Unauthorized: The password is not correct.")
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send("Internal Server Error.");
        }
    }
}

