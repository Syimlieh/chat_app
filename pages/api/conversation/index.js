import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Process a GET request
    console.log({ clientPromise });
    try {
      const client = await clientPromise;
      const db = client.db("conversation");

      // const convo = await db.findOne();

      res.status(400).json({
        success: true,
        message: "all Conversation",
        // data: convo
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error,
      });
    }
  } else {
    // Handle any other HTTP method
  }
}
