import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Process a POST request
    try {
      const { conversationId } = req.body;
      const client = await clientPromise;
      const db = client.db("message");

      const messages = await db.find({ conversationId });

      res.status(400).json({
        success: true,
        message: "Add New Message",
        data: messages,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  } else if (req.method === "POST") {
    // Handle POST HTTP method
    try {
      const { messageText, conversationId } = req.body;

      const client = await clientPromise;
      const db = client.db("message");

      // const convo = await db.findOne();
      const addMessage = await db.message.create({
        messageText,
        conversationId,
      });

      res.status(400).json({
        success: true,
        message: "Add New Message",
        data: addMessage,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  }
}
