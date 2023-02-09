import nc from "next-connect";
import onError from "@/helpers/Error/errorMiddleware";
// eslint-disable-next-line import/default
import Users from "@/model/Users";
import dbConnect from "@/lib/dbConnect";
const handler = nc(onError);

handler.post(async (req, res) => {
  try {
    await dbConnect();
    let user = await Users.findOne({ email: req.body.email });

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
      message: error.res,
    });
  }
});

handler.get(async (req, res) => {
  try {
    await dbConnect();
    let user = await Users.find();
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
      message: error.res,
    });
  }
});

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     // Process a GET request
//     try {
//       const client = await clientPromise;
//       const db = client.db("users");

//       const user = await db.findOne(req.params.email);

//       res.status(400).json({
//         success: true,
//         message: "User Profile",
//         data: user,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error,
//       });
//     }
//   } else if (req.method === "PUT") {
//     // Handle POST HTTP method
//     try {
//       const { email, userName, avatar, profile } = req.body;
//       const client = await clientPromise;
//       const db = client.db("sYiEmChAt");
//       const user = await db.collection("users").findOne({ email });

//       if (!user) {
//         res.status(404).json({
//           success: false,
//           message: "User Does Not Exist",
//         });
//       }
//       const userInfo = await db
//         .collection("users")
//         .updateOne({ email }, { $set: { userName, profile } });

//       res.status(200).json({
//         success: true,
//         message: "User Profile Updated Successfully",
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.res,
//       });
//     }
//   } else {
//     res.status(404).json({
//       success: false,
//       message: "Api Not Found",
//     });
//   }
// }
export default handler;
