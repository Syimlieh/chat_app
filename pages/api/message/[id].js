import { Messages } from "@/model";
import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";

const handler = nc(onError);

handler.get(async (req, res) => {
  const { id } = req.query;
  try {
    await dbConnect();

    const messages = await Messages.find({ inboxId: id })
      .sort({
        createdAt: 1,
      })
      .populate("senderId", "_id email userName");

    if (messages.length <= 0) {
      return res.status(200).json({
        success: true,
        message: "Message Empty",
      });
    }
    res.status(200).json({
      success: true,
      message: "Message Fetch Successfully",
      data: messages,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
export default handler;
