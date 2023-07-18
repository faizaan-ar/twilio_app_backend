import express from 'express';
import { createDBConnect } from './sequelize/connection';
import dotenv from "dotenv";
import { routes } from './routes/index.routes';

dotenv.config();

const app = express();

createDBConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', routes);

app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
});