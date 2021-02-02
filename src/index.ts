import express from 'express';
import mysql from 'mysql2/promise';
import { mysqlKeys } from './keys'
var cors = require('cors');

const PORT = 3200;

// Initalizacion
const app = express();

// Settings
app.set('port', process.env.PORT || PORT);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importing Routes
import userRoutes from './router/user.router';

// Routes
app.use('/user', userRoutes);

// Starting the server
export var connection : mysql.Connection
(async () => {

    connection = await mysql.createConnection({
        user: mysqlKeys.user,
        password: mysqlKeys.password,
        database: mysqlKeys.database,
    })

    app.listen(app.get('port'), () => {
        console.log(`Server on port ${app.get('port')}`);
    });

})();