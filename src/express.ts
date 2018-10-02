import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyparser from 'body-parser';
import router from './features/routes';
import { handleError } from './middleware';

export let app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/api', router);
app.use(handleError);
