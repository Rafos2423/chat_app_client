import classes from './ChatWindow.module.css'
import Message from "./Message/Message";
import Input from "../Input/Input";
import { useContext, useRef, useEffect } from 'react';
import { ConnectionContext } from '../../logic/Connection';

const ChatWindow = () => {
    const { sendMessage, messageHistory, chatName } = useContext(ConnectionContext);
    const messagesRef = useRef(null);

    useEffect(() => {      
        messagesRef.current?.lastElementChild?.scrollIntoView()
    }, [messageHistory[chatName]]);
    
    return (
        <div className={classes.container}>
            <div className={classes.header}>{chatName}</div>
            <ul ref={messagesRef} className={classes.messageHistory}>
                {messageHistory[chatName]?.map((x, i) => 
                    <li key={i}><Message text={x.message} isMyMessage={x.isMyMessage} receiveAt={x.receiveAt}></Message></li>
                )}
            </ul>
            {chatName && <div className={classes.inputContainer}>
                <Input func={sendMessage} placeHolder={'Сообщение'} width={700} isDark={true}/>
            </div>}
        </div>
    )
}

export default ChatWindow;