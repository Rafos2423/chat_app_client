import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, useState } from "react";

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [messageHistory, setMessageHistory] = useState({});
  const [connection, setConnection] = useState([]);
  const [chatName, setChatName] = useState("");
  const [userName, setUserName] = useState([]);
  const [token, setToken] = useState([]);

  const login = async (name) => {
    await fetch(`http://localhost:5041/login?userName=${name}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((res) => {
        setUserName(name)
        setToken(res.token)
        setIsModalVisible(false);
      });
  };

  const connect = async (chatName) => {
    let conn = new HubConnectionBuilder()
      .withUrl("http://localhost:5041/chat", {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveMessageAsync", (name, message, receiveAt) =>
      setMessageHistory((prevHistory) => ({
        ...prevHistory || [],
        [chatName]: [
          ...(prevHistory[chatName] || []),
          {
            message: message,
            isMyMessage: userName === name,
            receiveAt: receiveAt,
          },
        ],
      }))
    );

    await conn.start();
    await conn.invoke("JoinChatAsync", chatName);

    setConnection(conn);
    setChatName(chatName);
  };

  const sendMessage = async (text) =>
    await connection
      .invoke("SendMessageAsync", text, chatName)
      .catch((e) => console.log(e));

  return (
    <ConnectionContext.Provider
      value={{
        login,
        connect,
        sendMessage,
        messageHistory,
        isModalVisible,
        chatName,
        userName
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
