import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
import dbConnect from "@/lib/dbConnect";
import { Users, Group, Conversation, Inbox } from "@/model";

const handler = nc(onError);

handler.post(async (req, res) => {
  try {
    await dbConnect();
    const { groupAdmin, members, groupName } = req.body;
    const membersIds = members.map(member => member.memberId);
    console.log({membersIds})
    const user = await Users.find({ _id: { $in: membersIds }})
    if(user.length !== members.length) {
        return res.status(400).json({
            success: false,
            message: "Some members are not registered:",
        });
    }
    
    const group = new Group(req.body);
    await group.save();
    const inbox = new Inbox({
        lastMessage: `Welcome to ${groupName}`,
        senderId: groupAdmin[0],
    });
    await inbox.save();
    const conversation = new Conversation({
        type: 'group',
        participants: membersIds,
        group: group._id,
    })
    await conversation.save();

    res.status(200).json({
        success: true,
        message: "Group Created Successfully",
        data: conversation
    });
  } catch (error) {
    return res.status(400).json({
        success: false,
        message: error.message,
      });
  }
})

export default handler;
    