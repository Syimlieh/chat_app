import { Messages } from "@/model";
import dbConnect from "@/lib/dbConnect";

const fetchMessages = async (id, socket) => {
  try {
    await dbConnect();
    const messages = await Messages.find({ inboxId: id })
      .sort({
        createdAt: 1,
      })
      .populate("senderId", "_id email userName");
    if (messages.length <= 0) {
      return socket.emit("messages", { message: "Message Empty" });
    }
    socket.emit("messages", {
      success: true,
      message: "Messages Fetch Successfully",
      data: messages,
    });

  } catch (error) {
    socket.emit("error", {
      success: false,
      message: "Failed while fetching messages",
    });
  }
};

export { fetchMessages };
