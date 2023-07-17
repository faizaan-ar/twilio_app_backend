import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenModel } from "../../sequelize/models/token.model";
import { UserModel } from "../../sequelize/models/user.model";
import { access } from "fs";

export let generateAccessTokenController = async (req: Request, res: Response) => {

    let data: {
        refreshToken: string;
    } = req.body;

    try{
        let tokenPayload: any = jwt.verify(
            data.refreshToken,
            "dmVyeXZlcnlzZWNyZXRrZXk="
        );
        
        let user = await UserModel.findOne({
            where: {
                id: tokenPayload.id,
            },
        });

        if(!user){
            res.status(401).json({
                message: "User not found",
            });
            return;
        }

        let token = TokenModel.findOne({
            where: {
                token: data.refreshToken,
                userId: tokenPayload.id,
                type: 'refresh',
            }
        });

        if (!token) {
            res.status(401).json({
                message: "Invalid Token"
            });
            return;
        }

        let accessToken = jwt.sign(user.toJSON(), "dmVyeXZlcnlzZWNyZXRrZXk=", {
            expiresIn: "30m"
        });
        await TokenModel.destroy({
            where: {
                type: "access",
                userId: user.get("id"),
            }
        });

        await TokenModel.create({
            token: accessToken,
            userId: user.get("id"),
            type: "access",
        });

        res.json({
            message: accessToken,
        });

    }
    catch(e){
        res.status(401).json({
            message: e,
        });
        return;
    }

};