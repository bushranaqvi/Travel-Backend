require("dotenv").config();
require("express-async-errors");
const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

//connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");
//routers
const authRouter = require("./routes/auth");
const travelsRouter = require("./routes/travels");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/travels", authenticateUser, travelsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
