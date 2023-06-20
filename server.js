import express from 'express';
import env from 'dotenv';
env.config();
import connection from './utils/db.js';
import userRoute from './routes/user.js'

const app = express();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use('/api', userRoute);

connection();
app.listen(PORT, () => console.log(`server running on port ${PORT}`))