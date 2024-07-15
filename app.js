import express from "express";
import authRoute from "./api/routes/auth.route.js";
import testRoute from "./api/routes/test.route.js";
import userRoute from "./api/routes/user.route.js";
import postRoute from "./api/routes/post.route.js";
import chatRoute from "./api/routes/chat.route.js";
import messageRoute from "./api/routes/message.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.VITE_CLIENT_URL, credentials: true }));

console.log( process.env.VITE_CLIENT_URL);

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
