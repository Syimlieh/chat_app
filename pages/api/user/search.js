import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
// eslint-disable-next-line import/default
import Users from "@/model/Users";
import dbConnect from "@/lib/dbConnect";
import { searchUserPipeline } from "@/utils/pipeline/users.pipeline";
const handler = nc(onError);

handler.post(async (req, res) => {
    try {
      await dbConnect();
      ///not implementing yet
      const findUserPipeline = searchUserPipeline(req.body.search);
      const user = await Users.aggregate(findUserPipeline);
      if(!user) {
        return res.status(200).json({
            success: true,
            message: "No user found with this userName"
          });
      }
      return res.status(200).json({
        success: true,
        message: "User fetch successfully",
        data: user,
      });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: error.res,
          });
    }
})

export default handler;