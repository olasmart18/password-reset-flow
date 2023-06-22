import express from 'express';
import 'dotenv/config.js';
import connection from './utils/db.js';
import userRoute from './routes/user.js'
import pwdResetRoute from './routes/passwordReset.js'

const app = express();

const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use('/api', userRoute);
app.use('/', pwdResetRoute);

connection();
app.listen(PORT, () => console.log(`server running on port ${PORT}`))