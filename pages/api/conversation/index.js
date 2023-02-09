import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";
import { Messages, Conversation, Users, Inbox } from "@/model";

const handler = nc(onError);

// handler.post(async (req, res) => {
//   try {
//     await dbConnect();
//     const { senderId, text, receiverId } = req.body;
//     // const inbox = await Inbox.create({ senderId, lastMessage: text });
//     await Promise.all([
//       Inbox.updateOne(
//         { user: senderId, conversation: conversation._id },
//         {
//           $push: { messages: message },
//         },
//         { upsert: true }
//       ),
//       Inbox.updateOne(
//         { user: receiverId, conversation: conversation._id },
//         {
//           $push: { messages: message },
//         },
//         { upsert: true }
//       ),
//     ]);
//     const message = await Messages.create({
//       messageText: text,
//       inboxId: inbox._id,
//       senderId,
//     });
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });
//     if (!conversation) {
//       await Conversation.create({
//         participants: [senderId, receiverId],
//         inboxId: inbox._id,
//       });
//     }
//     conversation.messages.push(message);
//     await conversation.save();

//     res.status(200).json({
//       success: true,
//       message: "Conversation has been created",
//       data: message,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// Chat api
handler.post(async (req, res) => {
  try {
    await dbConnect();
    const { senderId, receiverId, messageText, meta } = req.body;

    // Check if sender exists
    const sender = await Users.findById(senderId);
    if (!sender) return res.status(400).json({ error: "Sender not found" });

    // Check if receiver exists
    const receiver = await Users.findById(receiverId);
    if (!receiver) return res.status(400).json({ error: "Receiver not found" });

    // Create a new conversation or retrieve existing one
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    let inbox;
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
