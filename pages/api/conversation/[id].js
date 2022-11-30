import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";
import { Users, Inbox, Conversation } from "@/model";

const handler = nc(onError);

dbConnect();

handler.get(async (req, res) => {
  try {
    await dbConnect();

    let user = await Users.findOne({ _id: req.query.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    let convo = await Conversation.find({ members: user._id }).exec(
      (err, data) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err,
          });
        }
        if (data.length <= 0) {
          return res.status(404).json({
            success: false,
            message: "No conversation Yet",
          });
        }
        const ids = data.map((item) => item.inboxId);
      }
    );

    if (!convo) {
      return res.status(404).json({
        success: false,
        message: "No conversation Yet",
      });
    }
    console.log(convo);
    const ids = convo.map((item) => item.inboxId);

    const inbox = await Inbox.find({
      _id: {
        $in: ids,
      },
    });
    // await Inbox.find({ _id: convo.inboxId });

    res.status(200).json({
      success: true,
      message: "Fetching inbox Successfully",
      inboxes: inbox,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
});

export default handler;
