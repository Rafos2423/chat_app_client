import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, useState } from "react";

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [messageHistory, setMessageHistory] = useState([]);
  const [connection, setConnection] = useState([]);

  const connect = async (name) => {
    let token;
    await fetch(`http://localhost:5041/login?userName=${name}`, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((res) => (token = res.token));

    setConnection(new HubConnectionBuilder());

    let conn = new HubConnectionBuilder()
      .withUrl("http://localhost:5041/chat", {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveMessageAsync", (userName, message, receiveAt) =>
      setMessageHistory((history) => [
        ...history,
        {
          message: message,
          isMyMessage: userName === name,
          receiveAt: receiveAt,
        },
      ])
    );

    await conn.start();
    await conn.invoke("JoinChatAsync", {
      name,
      chatRoom: "chatRoom123",
    });

    setConnection(conn);
    setIsModalVisible(false);
  };

  const sendMessage = async (text) => {
    console.log(connection);
    try {
      await connection.invoke("SendMessageAsync", text, null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ConnectionContext.Provider
      value={{ connect, sendMessage, isModalVisible, messageHistory }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
