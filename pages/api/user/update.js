import clientPromise from "@/lib/mongodb";
import nc from "next-connect";
import multer from "multer";
import path from "path";
import onError from "@/helpers/Error/errorMiddleware";
import MulterGoogleCloudStorage from "multer-cloud-storage";
// eslint-disable-next-line import/default
import Users from "@/model/Users";
import dbConnect from "@/lib/dbConnect";

dbConnect();

const handler = nc(onError);

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) cb(null, "public/uploads/profile");
  },
  filename: function (req, file, cb) {
    if (file) {
      cb(null, req.body.email.split("@", 1) + path.extname(file.originalname));
    }
  },
});

// const MulterGoogleCloudStorageOptions = {
//   bucket: process.env.BUCKET_NAME,
//   filename: function getFilename(req, file, cb) {
//
//     cb(null, `${file.originalname}`);
//   },
// };

// const storage = new MulterGoogleCloudStorage({
//   MulterGoogleCloudStorageOptions,
// });

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");

handler.use(uploadFile);

handler.patch(async (req, res) => {
  try {
    const { email, userName, profile } = req.body;

    let url = "http://" + req.headers.host;
    let fileName = req?.file?.filename;
    let updateProfile = await Users.findOneAndUpdate(
      { email },
      { $set: { userName, profile, fileName } }
    );

    res.status(200).json({
      success: true,
      message: "User Profile Updated Successfully",
      data: updateProfile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
});

export default handler;
