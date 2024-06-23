import classes from "./ChatWindow.module.css";
import Message from "./Message/Message";
import Input from "../Input/Input";
import { useContext } from "react";
import { ConnectionContext } from "../../logic/Connection";
import useScroll from "../../../Hooks/useScroll";

const ChatWindow = () => {
  const { sendMessage, messageHistory, chatName, messagesCount } =
    useContext(ConnectionContext);
    const { messagesRef, showScrollButton, scrollBottom } = useScroll(messagesCount);

  return (
    <div className={classes.container}>
      <div className={classes.header}>{chatName}</div>
      <ul ref={messagesRef} className={classes.messageHistory}>
        {messageHistory[chatName]?.map((x, i) => (
          <li key={i} className={classes.messageItem}>
            <Message
              text={x.message}
              isMyMessage={x.isMyMessage}
              receiveAt={x.receiveAt}
            ></Message>
          </li>
        ))}
      </ul>
      {chatName && (
        <div className={classes.pannel}>
          <div></div>
          <div className={classes.inputContainer}>
            <Input
              func={sendMessage}
              placeHolder={"Сообщение"}
              width={700}
              isDark={true}
            />
          </div>
          <button
            className={`${classes.scrollButton} ${
              showScrollButton ? "" : classes.unvisible
            }`}
            onClick={scrollBottom}
          >
            <i className="pi pi-arrow-down"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
