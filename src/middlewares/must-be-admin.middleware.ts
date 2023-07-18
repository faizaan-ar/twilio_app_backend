import { NextFunction, Response } from "express";
import { CustomRequest } from "./authorize-request.middleware";

export function mustBeAdminMiddleware(req: CustomRequest, res: Response, next: NextFunction){
    if(req.user?.role !== 'ADMIN'){
        res.status(403).json({message: 'Forbidden'});
        return;
    }
    next();
}