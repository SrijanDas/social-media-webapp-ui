import React, { useContext, useEffect, useState } from "react";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./Messenger.css";
import axios from "../../axios";

function Messenger() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const msg = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };
    try {
      const res = await axios.post("/messages", msg);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div
                key={c._id}
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          {currentChat ? (
            <div className="chatBoxWrapper">
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <Message
                    key={m._id}
                    message={m}
                    own={m.sender === user._id}
                  />
                ))}
              </div>

              <div className="chatBoxBottom">
                <input
                  className="chatMessageInput"
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="chatSubmitButton"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <span>Open a chat</span>
          )}
        </div>

        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            online
            <Conversation />
            <Conversation />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
