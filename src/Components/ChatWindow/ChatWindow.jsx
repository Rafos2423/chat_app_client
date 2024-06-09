import classes from './ChatWindow.module.css'
import Message from "./Message/Message";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState, useEffect } from 'react';

const ChatWindow = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [connection, setConnection] = useState({});
    const [inputText, setInputText] = useState("");

    useEffect(() => {(
        async () => {
            var conn = new HubConnectionBuilder().withUrl("http://localhost:5041/chat").configureLogging(LogLevel.Warning).build();

            conn.on("ReceiveMessage", message => setMessageHistory(history => [...history, message]))
            await conn.start();
            setConnection(conn)
        })();
    }, [])

    const sendMessage = async (text) =>
    {
        try{
            await connection.invoke("SendMessageAsync", text)
        } catch (e) {
            console.log(e)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value) {
            sendMessage(event.target.value);
            setInputText("");
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.messageHistory}>
                {messageHistory.map((x, i) => <Message key={i} text={x}></Message>)}
            </div>
            <div className={classes.inputContainer}>
                <input type='text' className={classes.inputField} value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder='Сообщение' onKeyPress={handleKeyPress}/>
            </div>
        </div>
    )
}

export default ChatWindow;