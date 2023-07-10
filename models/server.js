const express = require('express');
const cors = require('cors');

const db = require('../db/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            users: '/api/users',
            questions: '/api/questions'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        try {
            await db.connect(`${process.env.DATABASE_CONN}`);
            console.log('Base de datos online!');
        } catch (error) {
            console.log(error);
        }
        
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.questions, require('../routes/questions'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;