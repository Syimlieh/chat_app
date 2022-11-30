import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";
import { Messages, Conversation, Users, Inbox } from "@/model";

const handler = nc(onError);

handler.post(async (req, res) => {
  try {
    await dbConnect();
    const { senderId, receiverId, text } = req.body;
    //checker
    let sender = await Users.findOne({ _id: senderId });
    let receiver = await Users.findOne({ _id: receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    //inbox
    const inbox = await Inbox.create({
      senderId: sender._id,
      lastMessage: text,
    });

    //
    await Conversation.create({
      members: [sender._id, receiver._id],
      inboxId: inbox._id,
    });
    // message
    await Messages.create({
      senderId: sender._id,
      messageText: text,
      inboxId: inbox._id,
    });

    res.status(200).json({
      success: true,
      message: "Convo added Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.res,
    });
  }
});

export default handler;
