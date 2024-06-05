import express from "express";
import authRoute from "./api/routes/auth.route.js";
import testRoute from "./api/routes/test.route.js";
import userRoute from "./api/routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/user", userRoute);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
