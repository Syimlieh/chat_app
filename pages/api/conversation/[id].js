import { Inbox, Users, Conversation, Messages } from "@/model";
import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";

const handler = nc(onError);

handler.get(async (req, res) => {
  const { id } = req.query;
  try {
    await dbConnect();

    // Find the user with the given userId
    const user = await Users.findOne({ email: id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    // Find all the conversations that the user is a participant in
    const conversations = await Conversation.find({
      participants: user._id,
    })
      .populate("inboxId")
      .populate("participants", "_id userName email");

    if (conversations?.length <= 0) {
      return res.status(404).json({
        success: true,
        message: "No conversation Yet, Please start a new conversation",
      });
    }

    //get The other member from participants
    const otherParticipants = conversations.map((conversation) => {
      const other = conversation.participants.find((participant) => {
        return participant._id.toString() !== user._id.toString();
      });
      return { ...conversation.toObject(), other };
    });
    // Get the inboxIds for all the conversations
    const inboxIds = conversations.map((conversation) => conversation.inboxId);

    // Find all the inboxes with the given inboxIds
    const inboxes = await Inbox.find({
      _id: { $in: inboxIds },
    }).populate("senderId", "_id email userName");

    if (!inboxes) {
      return res.status(404).json({
        success: true,
        message: "Inbox empty, Please start a new Conversation",
      });
    }
    // const message = await Messages.find({inboxId: Inboxes})
    res.status(200).json({
      success: true,
      message: "Fetching inbox Successfully",
      conversations: otherParticipants,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default handler;
