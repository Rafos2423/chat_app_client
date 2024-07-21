import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { createContext, useState } from "react";

export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [messageHistory, setMessageHistory] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [connection, setConnection] = useState([]);
  const [chatName, setChatName] = useState("");
  const [userName, setUserName] = useState([]);
  const [token, setToken] = useState("");

  console.log(userChats)

  const login = async (name) => {
    await fetch(`http://localhost:5041/auth/login?userName=${name}`, {
      method: "POST",
      })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then(async (res) => {
        await getUserChats(res.token)
        setUserName(name)
        setToken(res.token)
        setIsModalVisible(false);
      })
      .catch((e) => console.log(e));
  };

  const getUserChats = async (jwt) => {
    await fetch(`http://localhost:5041/user/chats`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }})
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((res) => setUserChats(res))
      .catch((e) => console.log(e));
  }

  const getChatsByName = async (chatName) => 
    await fetch(`http://localhost:5041/chat/${chatName}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }})
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((res) => res.length ? res[0].id : 0)
      //TODO popup
      .catch((e) => console.log(e));

  const createChat = async (chatName) => {
    await fetch(`http://localhost:5041/chat`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(chatName)
    })
    .then((response) => {
      if (response.ok) return response.json();
    })
    .then(async (res) => {
      console.log(res)
      setUserChats((chats) => [...chats, 
      {
        Name: res.Name,
        Id: res.Id,
      }])
      await connect(res.Id, res.Name)
    })
    .catch((e) => console.log(e));
  }

  const connect = async (chatId, chatName) => {
    setMessageHistory([])
    
    let conn = new HubConnectionBuilder()
      .withUrl("http://localhost:5041/chat", {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveMessageAsync", (name, message, receiveAt) => 
      setMessageHistory(history => [...history, 
        {message: message, isMyMessage: userName === name, receiveAt: receiveAt}
      ])
    );

    // let chatId = await getChatsByName(chatName)
    // console.log(chatId)

    await conn.start();
    await conn.invoke("JoinChatAsync", chatId);

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
        createChat,
        userChats,
        messageHistory,
        isModalVisible,
        chatName,
        userName,
        messagesCount: messageHistory?.length
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};
