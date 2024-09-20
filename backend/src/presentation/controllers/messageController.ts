import { NextFunction, Request, Response } from "express";
import { messageModel } from "../../domain/messageModel";

// Add a new message to the chat
export const addMessage = (io: any) => async (req: any, res: Response) => {
  const { chatId, senderId, text, senderModel } = req.body;

  // Log to see if the request data is received correctly
  console.log("Received message data:", { chatId, senderId, text, senderModel });

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
    res.status(500).json({ message: "Failed to add message", error: error.message });
  }
};


// Get messages for a specific chat
export const getMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;

  try {
    // Find messages by chatId and populate senderId to get details of the sender
    const messages = await messageModel.find({ chatId }).populate("senderId");

    // Check if any messages were found
    if (!messages.length) {
      return res
        .status(404)
        .json({ message: "No messages found for this chat" });
    }

    res.status(200).json(messages);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to retrieve messages", error: error.message });
  }
};

export const companyAddMessage = async (req: Request, res: Response) => {
  const { chatId, senderId, text, senderModel } = req.body.messageData; // Include senderModel

  // console.log(chatId, senderId, text, senderModel);

  // Validate the request data
  if (!chatId || !senderId || !text || !senderModel) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Ensure senderModel is either "User" or "Company"
  if (!["User", "Company"].includes(senderModel)) {
    return res.status(400).json({ message: "Invalid senderModel" });
  }

  try {
    const message = new messageModel({
      chatId,
      senderId,
      text,
      senderModel, // Add senderModel when creating the message
    });

    // Save the new message
    const result = await message.save();
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to add message", error: error.message });
  }
};
