import { NextFunction, Request, Response } from "express";
import { chatModel } from "../../domain/chatModel";


export const createChat = async (req: Request, res: Response) => {
    const newChat = new chatModel({
        // members: [req.body.senderId, req.body.receiverId],
        userId: req.body.senderId,
        companyId: req.body.receiverId
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
        userId: req.params.userId // Querying by userId directly
      });
  
      res.status(200).json(chat);
    } catch (error: any) {
      res.status(500).json(error);
    }
  };
  

export const findChat = async(req: Request, res: Response) => {

    try {
        const chat = await chatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]}
        })
        res.status(200).json(chat);
    } catch (error: any) {
        console.log(error);
        res.status(500).json(error)
    }
}