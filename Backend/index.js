const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/posts");

dotenv.config();
const port = process.env.PORT;

mongoose.set("strictQuery", false);
/* Connecting to the MongoDB database. */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((e) => console.log(e));

//middleware
/* A middleware that parses the incoming request body and makes it available as req.body. */
app.use(express.json());
app.use(cookieParser());
/* A middleware that sets HTTP headers to help protect the app from some well-known web
vulnerabilities. */
app.use(helmet());

/* A middleware that logs the HTTP requests. */
app.use(morgan("common"));

/* Routes*/
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

/* Listening to the port. */
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
