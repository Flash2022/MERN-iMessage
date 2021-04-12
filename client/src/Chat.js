  
import { IconButton } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";
import { selectChatId, selectChatName } from "./features/chatSlice";
import Message from "./Message";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("fe08eec36f7bc3b77b1b", {
  cluster: "ap2",
});

function Chat() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState("");
  const chatName = useSelector(selectChatName);
  const chatId = useSelector(selectChatId);
  const [messages, setMessages] = useState([]);

  const getConversation = (chatId) => {
    if (chatId) {
      axios.get(`/get/conversation?id=${chatId}`).then((res) => {
        setMessages(res.data[0].conversation);
      });
    }
  };

  useEffect(() => {
    pusher.unsubscribe("messages");

    getConversation(chatId);

    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", function (data) {
      getConversation(chatId);
    });
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input) {
    axios.post(`/new/message?id=${chatId}`, {
      message: input,
      timestamp: Date.now(),
      user: user,
    });
    }
    
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To: <span className="chat__name">{chatName}</span>
        </h4>
        <strong>Details</strong>
      </div>

      {/* chat messages */}
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ user, _id, message, timestamp }) => (
            <Message
              key={_id}
              id={_id}
              sender={user}
              message={message}
              timestamp={timestamp}
            />
          ))}
        </FlipMove>
      </div>

      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage here"
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>

        <IconButton>
          <MicNoneIcon className="chat__mic" />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;