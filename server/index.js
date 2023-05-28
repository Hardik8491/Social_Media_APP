import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/authController.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/usersRoute.js";
import postRoutes from "./routes/postsRoute.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/postController.js";

// /*Dummy Data Section*/
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { userController, postController } from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.get("/file/:filePath", (req, res) => {
  const filepath = path.join(
    __dirname,
    "/public/assets/" + req.params.filePath
  );

  res.sendFile(filepath);
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/static", express.static("public"));


//Server Side Rendering through node js
app.use(express.static(path.join(__dirname, "../chatapp/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../chatapp/build/index.html"));
});
/**ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/post", verifyToken, upload.single("picture"), createPost);

/*Routes*/

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/*MONGOOSE SETUP*/
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Started at  Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(userController);
    //  Post.insertMany(postController);
  })
  .catch((error) => console.log(`${error} did not connect`));
