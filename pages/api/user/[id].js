import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
// eslint-disable-next-line import/default
import Users from "@/model/Users";
import dbConnect from "@/lib/dbConnect";

const handler = nc(onError);
handler.get(async (req, res) => {
  try {
    await dbConnect();
    let user = await Users.findOne({ userName: req.query.id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetch Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default handler;
