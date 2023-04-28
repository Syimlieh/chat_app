import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";
import { Messages, Conversation, Users, Inbox, Group } from "@/model";

const handler = nc(onError);

// Chat api
handler.post(async (req, res) => {
  try {
    await dbConnect();
    const { senderId, receiverId, messageText, meta, type, groupId } = req.body;

    // Check if sender exists
    const sender = await Users.findById(senderId);
    if (!sender) return res.status(400).json({ error: "Sender not found" });
    // var
    let conversation;
    let inbox;
    if (type === "group") {
      conversation = await Conversation.findOne({
        group: groupId,
        type: "group",
      });
      const group = await Group.findOne({ _id: groupId });
      if (!group) return res.status(400).json({ error: "Group not found" });
    }
    else {
      const receiver = await Users.findById(receiverId);
      if (!receiver) return res.status(400).json({ error: "Receiver not found" });
  
      // Create a new conversation or retrieve existing one
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      
      if (!conversation) {
        conversation = await new Conversation({
          participants: [senderId, receiverId],
          type: "personal",
        }).save();
        inbox = await new Inbox({
          senderId,
          receiverId,
          lastMessage: messageText,
        }).save();
        conversation.inboxId = inbox._id;
        await conversation.save();
      }
    }
    // Check if receiver exists
    
    // Create a new inbox or retrieve existing one
    inbox = await Inbox.findOne({
      _id: conversation.inboxId,
    });

    inbox.lastMessage = messageText;
    inbox.seen = false;
    await inbox.save();

    // Update the conversation with the inboxId

    // Save the new message
    await new Messages({
      senderId,
      receiverId,
      inboxId: inbox._id,
      messageText,
      meta,
    }).save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default handler;