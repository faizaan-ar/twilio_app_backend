import { Request, Response } from "express";
import { UserModel } from "../../sequelize/models/user.model";
import jwt from "jsonwebtoken";
import { TokenModel } from "../../sequelize/models/token.model";

export let signInController = async (req: Request, res: Response) => {

    let data: {
        email: string; 
        password: string; 
    } = req.body;

   let user = await UserModel.findOne({
    where: {
        email: data.email,
        password: data.password,
    },
   });

   if(!user){
    res.status(401).json({
        message: "Invalid Credentials",
    });
    return;
   }

   //delete all tokens of this user first
   await TokenModel.destroy({
    where: {
        userId: user.get("id"),
    }
   })

   let accessToken = jwt.sign(user.toJSON(), "dmVyeXZlcnlzZWNyZXRrZXk=", {
    expiresIn: "7d",
   })

   let refreshToken = jwt.sign(user.toJSON(), "dmVyeXZlcnlzZWNyZXRrZXk=");
   
   await TokenModel.create({
    token: refreshToken,
    userId: user.get("id"),
    type: "refresh"
   });

   await TokenModel.create({
    token: accessToken,
    userId: user.get("id"),
    type: "access"
   });   

   let session = {
    accessToken,
    refreshToken,
    user
   };

    res.json(session);
};