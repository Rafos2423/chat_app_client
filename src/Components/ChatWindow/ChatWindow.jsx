import classes from './ChatWindow.module.css'
import Message from "./Message/Message";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { useState } from 'react';
import Modal from "./../Modal/Modal";


const ChatWindow = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [connection, setConnection] = useState({});
    const [inputUserText, setInputUserText] = useState("");
    const [inputMessageText, setInputMessageText] = useState("");
    const [isModalVisible, SetIsmodalVisible] = useState(true);

    const connect = async name => {
        try {
            let token;
            await fetch(`http://localhost:5041/login?userName=${name}`, {method: 'POST'})
                .then(response => { if (response.ok) return response.json() })
                .then(res => token = res.token)

            var conn = new HubConnectionBuilder()
                .withUrl("http://localhost:5041/chat", { accessTokenFactory: () => token })
                .configureLogging(LogLevel.Warning)
                .build();

            conn.on("ReceiveMessageAsync", (userName, message, receiveAt) =>
                setMessageHistory(history => [...history, 
                    {message: message, isMyMessage: userName === name, receiveAt: receiveAt}
                ]))

            await conn.start();

            setConnection(conn)
            SetIsmodalVisible(false)
        } catch (e) {
            console.log(e)
        }
    }

    const sendMessage = async (text) =>
    {
        try {
            await connection.invoke("SendMessageAsync", text)
        } catch (e) {
            console.log(e)
        }
    }

    const handleKeyPress = (event, func, updateField) => {
        if (event.key === 'Enter' && event.target.value) {
            func(event.target.value);
            updateField("");
        }
        else
            updateField(event.target.value);
    };

    return (
        <>
            {isModalVisible ? <Modal value={inputUserText} setValue={e => setInputUserText(e.target.value)} onKeyPress={(e) => handleKeyPress(e, connect, setInputUserText)}/>: <></>}
            <div className={classes.container}>
                <div className={classes.messageHistory}>
                    {messageHistory.map((x, i) => 
                        <Message key={i} text={x.message} isMyMessage={x.isMyMessage} receiveAt={x.receiveAt}></Message>
                    )}
                </div>
                <div className={classes.inputContainer}>
                    <input type='text' className={classes.inputField} placeholder='Сообщение'
                        value={inputMessageText} onChange={e => setInputMessageText(e.target.value)}
                        onKeyPress={e => handleKeyPress(e, sendMessage, setInputMessageText)}/>
                </div>
            </div>
        </>
    )
}

export default ChatWindow;