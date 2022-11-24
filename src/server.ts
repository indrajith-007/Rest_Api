import express from 'express';
import routes from './routes/routes';
import config from 'config';
import connect from './utils/connectdb';
import log from './utils/logger';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import bodyParser from 'body-parser';

const app = express();

const port = config.get<number>('port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
    app.listen(`${port}`, () => {
        log.info('server started');
        connect();
        routes(app);
    });
} catch (error) {
    process.exit(1);
}
