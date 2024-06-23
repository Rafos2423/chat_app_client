import classes from './ChatNavigation.module.css'
import { useState, useEffect } from "react";

const ChatNavigation = ({chatName, lastMessage, onClick}) =>
{
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {setSelected(false)}, 500);
        return () => clearTimeout(timeoutId);
      }, [selected]);

    return <div className={`${classes.container} ${selected ? classes.selected : classes.unselected}`} onClick={_ => {onClick(chatName); setSelected(true)}}>
        <div className={classes.wrapper}>
            <div className={classes.chatName}>{chatName}</div>
            <div className={classes.time}>{lastMessage.receiveAt}</div>
        </div>
        <div className={classes.lastMessage}>{lastMessage.message}</div>
    </div>
}

export default ChatNavigation