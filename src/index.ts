import express from 'express';
import { createDBConnect } from './sequelize/connection';
import { AccountModel } from './sequelize/models/account.model';

const app = express();

createDBConnect();

app.listen(3000, () => {
    console.log("Server running on port http://localhost:3000");
});