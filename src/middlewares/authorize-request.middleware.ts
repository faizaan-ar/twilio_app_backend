import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { UserModel } from "../sequelize/models/user.model";
import { TokenModel } from "../sequelize/models/token.model";

export interface CustomRequest extends Request{
    user?: UserModel;
}

export async function authorizeRequestMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    
    try{
        let accessToken = req.headers.authorization?.split(" ")[1];
        let tokenPayload: any = jwt.verify(accessToken!, "dmVyeXZlcnlzZWNyZXRrZXk=");

        let user = await UserModel.findOne({
            where: {
                id: tokenPayload.id,
            },
        })

        if(!user) {
            res.status(401).json({
                message: "User not found",
            });
            return;
        }

        let token = await TokenModel.findOne({
            where: {
                token: accessToken,
                userId: user.get("id"),
                type: "access",
            },
        });

        if (!token){
            res.status(401).json({
                message: "Invalid Token",
            });
            return;
        }

        req.user = user;

        next();
        
    }

    catch(error){
        res.status(401).json({
            message: error,
        });
        return;
    }

}