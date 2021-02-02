import { connection } from '../index'

export default class UserDatabase {

    static async createUser(username: string, password: string) {
        await connection.execute(
            'INSERT `users` values (null, ?, ?)',
            [username, password],
        )
        const query = await connection.query(
            'SELECT * FROM `users` WHERE `username` = ?',
            [username]
        );
        let newUser = <UserModel>(<any> query[0])[0];
        return newUser;
    }

    static async findUserByUsername(username: string) {
        const query = await connection.query(
            'SELECT * FROM `users` WHERE `username` = ?',
            [username]
        );
        let newUser = <UserModel>(<any> query[0])[0];
        return newUser;
    }
}

interface UserModel {
    id: string,
    username: string,
    passwd: string,
}