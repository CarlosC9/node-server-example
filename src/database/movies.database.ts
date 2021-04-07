import { connection } from '../index'

export default class MoviesDatabase {

    static async getFilmsByPage() {
        const query = await connection.query(
            'SELECT * FROM `video`.`movies`'
        );
        return query[0];
    }
}