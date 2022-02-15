// connect mongoDB
require("./models/connect");

const express = require("express");
const app = express();
const cors = require("cors");

// config
const config = require("config");
const { checkSession } = require("./modules/middleware");
const PORT = config.get("port");

// routes
const timetableRouter = require("./routes/timetableRouter");
const authRouter = require("./routes/authRouter");

// sessions mongoDB
const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: config.get("database"),
    collection: "sessions",
    ttl: 14 * 24 * 60 * 60, // = 14 days
  }),
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: 3600000 * 24 * 20, // 24 часа
  },
});

app.use(sessionMiddleware);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use("/", checkSession, timetableRouter);
app.use("/", checkSession, authRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
