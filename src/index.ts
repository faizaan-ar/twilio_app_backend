import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { createDBConnect } from './sequelize/connection';
import dotenv from "dotenv";
import { routes } from './routes/index.routes';

dotenv.config();

const app = express();

createDBConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', routes);

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).send("Something broke!");
// })

app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
});