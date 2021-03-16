import express from 'express';
import router from './routes/index';
import ExpressSession from 'express-session';
import config from './utils/config';
import { v4 } from 'uuid';

const app = express();

app.use(ExpressSession({
    secret: config.express.secret ||  v4()
}));

app.use('/', router);

app.listen(config.express.port, () => {
    console.log("Listening... on port " + config.express.port);
});