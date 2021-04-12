// import
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import path from "path";
import mongoData from "./mongoData.js";

//serve static assests
if(process.env.NODE_ENV === 'production'){
  //static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
  });

}

// app config
const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
  appId: "1186800",
  key: "fe08eec36f7bc3b77b1b",
  secret: "3cc62186c3cd0cd9e593",
  cluster: "ap2",
  useTLS: true
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/build")));

// db config
const mongoURI =
  "mongodb+srv://main:Tarun@123@cluster0.1bmpn.mongodb.net/messageDB1?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");

  const changeStream = mongoose.connection.collection("conversations").watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("chats", "newChat", {
        change: change,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("messages", "newMessage", {
        change: change,
      });
    } else {
      console.log("Error triggering Pusher...");
    }
  });
});

// api routes
//app.get("/", (req, res) => res.status(200).send("Hello"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post("/new/conversation", (req, res) => {
  const dbData = req.body;

  mongoData.create(dbData, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/new/message", (req, res) => {
  mongoData.update(
    { _id: req.query.id },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("Error saving message...");
        console.log(err);

        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    }
  );
});

app.get("/get/conversationList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      let conversations = [];

      data.map((conversationData) => {
        const conversationInfo = {
          id: conversationData._id,
          name: conversationData.chatName,
          timestamp: conversationData.conversation[0].timestamp,
        };

        conversations.push(conversationInfo);
      });

      res.status(200).send(conversations);
    }
  });
});

app.get("/get/conversation", (req, res) => {
  const id = req.query.id;

  mongoData.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/get/lastMessage", (req, res) => {
  const id = req.query.id;

  mongoData.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      let convData = data[0].conversation;

      convData.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });

      res.status(200).send(convData[0]);
    }
  });
});

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`));