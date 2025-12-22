import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/chatSocket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";

const Chat = () => {
  const { id } = useParams();
  const loggedInUser = useSelector((store) => store.login.userData);
  const loggedInUserId = loggedInUser?._id;
  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState([]);

  useEffect(() => {
    if (!id) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: loggedInUser?.firstName,
      lastName:loggedInUser?.lastName,
      loggedInUserId,
      id,
    });
    socket.on("messageReceived", ({ firstName,lastName, message }) => {
      setDisplayMessage((prev) => [...prev, { firstName,lastName, message }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUserId, id]);

  const handleSent = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      loggedInUserId,
      id,
      message,
    });
    setMessage("");
  };

  const chatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${id}`, {
        withCredentials: true,
      });
      const messageDb = chat.data.data.messages.map((msg) => {
        return {
          firstName: msg.sender.firstName,
          lastName: msg.sender.lastName,
          message: msg.message,
        };
      });
      setDisplayMessage(messageDb);
    } catch (error) {
       toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    chatMessages();
  }, []);
  return (
    <div className="w-full mt-4 md:mt-20 flex justify-center items-center">
      <div className="border border-black  w-full md:w-[40%] mx-4 md:mx-0 rounded-xl ">
        <p className="border-b border-black pl-4 py-3 font-bold text-[1.5rem]">Chat</p>
        <div className="flex-1 overflow-y-scroll h-[30rem] p-3">
          {displayMessage.map((msg, index) => {
            return (
              <div
                className={`chat ${
                  loggedInUser.firstName === msg.firstName
                    ? "chat-end"
                    : "chat-start"
                }`}
                key={index}
              >
                <div className="chat-header">
                      {msg.firstName}
                  <span> {msg.lastName}</span>
                  <time className="text-xs opacity-50">12:50</time>
                </div>
                <div className="chat-bubble">{msg.message}</div>
                {/* <div className="chat-footer opacity-50">Delivered</div> */}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between gap-2 border-t border-black py-5 px-2 w-full">
          <input
            className=" rounded bg-transparent border border-black w-[90%]"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="border bg-pink-500 text-white px-4 py-1 rounded-xl"
            onClick={handleSent}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
