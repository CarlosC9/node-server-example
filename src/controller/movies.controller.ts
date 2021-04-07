import { Request, Response } from 'express';
import MoviesDatabase from '../database/movies.database';
import fs from 'fs';
import path from 'path'

export default class MoviesController {

    static async getFilmsByPage(req: Request, res: Response) {
        let { page } = req.query;
        if (!page) {
            return res.status(400).send("Bad Request: page is null.");
        }
        try {
            const films: any = await MoviesDatabase.getFilmsByPage();
            if (films) {
                var responseFilms = []
                for (var i in films) {
                    const pathFile = path.resolve(__dirname, `../../public/films/${films[i].nameDirectory}/${films[i].imageFile}`);
                    var bitmap = fs.readFileSync(pathFile, 'base64');
                    responseFilms.push({
                        name: films[i].name,
                        image: bitmap,
                        imageType: `image/${path.extname(pathFile).replace('.','')}`,
                    });
                }
                return res.status(200).json(responseFilms);
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send("Internal Server Error.");
        }
    }

}