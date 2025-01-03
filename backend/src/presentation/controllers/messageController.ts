import { NextFunction, Request, Response } from "express";
import { messageModel } from "../../domain/messageModel";
import { io } from "../../main";
import { chatModel } from "../../domain/chatModel";

// Add a new message to the chat
export const addMessage = (io: any) => async (req: any, res: Response) => {
  const { chatId, senderId, text, senderModel } = req.body;

  console.log({ chatId, senderId, text, senderModel });

  // Log to see if the request data is received correctly
  console.log("Received message data:", {
    chatId,
    senderId,
    text,
    senderModel,
  });

  if (!chatId || !senderId || !text || !senderModel) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const message = new messageModel({ chatId, senderId, text, senderModel });
    const result = await message.save();

    // Log the saved message
    console.log("Saved message:", result);

    const populatedMessage: any = await messageModel
      .findById(result._id)
      .populate("senderId", "username");

    // Log the populated message details
    console.log("Populated message:", populatedMessage);

    io.to(chatId).emit("message", {
      _id: populatedMessage?._id,
      text: populatedMessage?.text,
      senderId: {
        _id: populatedMessage?.senderId?._id,
        username: populatedMessage?.senderId.username,
      },
      senderModel: populatedMessage?.senderModel,
    });

    res.status(200).json(populatedMessage);
  } catch (error: any) {
    console.error("Error saving message:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add message", error: error.message });
  }
};

export const getMessage = async (req: any, res: Response) => {
  const { chatId } = req.params;
  const { senderId } = req.query;

  try {
    const messages = await messageModel.find({ chatId }).populate("senderId");

    if (!messages.length) {
      return res
        .status(404)
        .json({ message: "No messages found for this chat" });
    }

    await messageModel.updateMany(
      { chatId, isRead: false, senderId: { $ne: senderId } },
      { $set: { isRead: true } }
    );
    
    const unreadCount = await messageModel.countDocuments({
      chatId,
      senderId: { $ne: senderId },
      isRead: false,
    });

    io.emit("unreadCount", { unreadCount });

    res.status(200).json(messages);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to retrieve messages", error: error.message });
  }
};

export const companyAddMessage = async (req: any, res: any) => {
  const { chatId, senderId, text, senderModel } = req.body.messageData;

  console.log(chatId, senderId, text, senderModel);

  if (!chatId || !senderId || !text || !senderModel) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["User", "Company"].includes(senderModel)) {
    return res.status(400).json({ message: "Invalid senderModel" });
  }

  try {
    const message = new messageModel({
      chatId,
      senderId,
      text,
      senderModel,
    });

    const result = await message.save();
    console.log({ result });

    io.to(chatId).emit("message", result);

    await chatModel.findByIdAndUpdate(
      chatId,
      { lastMessage: text }, 
      { new: true } 
    );

    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to add message", error: error.message });
  }
};
