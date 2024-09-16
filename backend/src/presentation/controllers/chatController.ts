import { NextFunction, Request, Response } from "express";
import { chatModel } from "../../domain/chatModel";


export const createChat = async (req: Request, res: Response) => {
    const newChat = new chatModel({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {

        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json(error);
    }
}

export const userChat = async (req: Request, res: Response) => {

    try {

        const chat = await chatModel.find({
            members: {$in: [req.params.userId]}
        })
        
        
    } catch (error: any) {
        res.status(500).json(error)
    }

}