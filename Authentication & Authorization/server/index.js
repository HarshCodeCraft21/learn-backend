import express from 'express';
import env from 'dotenv';
import cookieParser from 'cookie-parser';

import { CONNECTDB } from './db/db.js';
import { UserRoute } from './routes/user.route.js';

env.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());

//All Routes
app.use('/users', UserRoute);

const serverStart = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`server is running on port :- ${PORT}`)
        });
        await CONNECTDB();
    } catch (error) {
        console.log("failed to start server", error.message);
    }
};

serverStart();

