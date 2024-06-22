import classes from './ChatWindow.module.css'
import Message from "./Message/Message";
import Input from "../Input/Input";
import { useContext } from 'react';
import { ConnectionContext } from '../../logic/Connection';

const ChatWindow = () => {
    const { sendMessage, messageHistory, chatName } = useContext(ConnectionContext);
    
    return (
        <div className={classes.container}>
            <div className={classes.header}>{chatName}</div>
            <div className={classes.messageHistory}>
                {messageHistory[chatName]?.map((x, i) => 
                    <Message key={i} text={x.message} isMyMessage={x.isMyMessage} receiveAt={x.receiveAt}></Message>
                )}
            </div>
            {chatName && <div className={classes.inputContainer}>
                <Input func={sendMessage} placeHolder={'Сообщение'} width={700} isDark={true}/>
            </div>}
        </div>
    )
}

export default ChatWindow;