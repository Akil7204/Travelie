import { NextFunction, Request, Response } from "express";
import { messageModel } from "../../domain/messageModel";

export const addMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, text } = req.body;

  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    res.status(200).json(result)
  } catch (error: any) {
    res.status(500).json(error);
  }
};

export const getMessage = async (req: Request, res: Response) => {
    const {chatId} = req.params;
    try {
        const result = await messageModel.find({chatId});
        res.status(200).json(result)
    } catch (error: any) {
        res.status(500).json(error);
    }
}
