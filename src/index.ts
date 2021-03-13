import express from 'express';
import router from './routes/index';
import ExpressSession from 'express-session';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const app = express();

app.use(ExpressSession({
    secret: process.env.SECRET!
}));

app.use('/', router);

app.listen(process.env.PORT || 8000);