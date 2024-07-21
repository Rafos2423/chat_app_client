import { useState } from "react";
import classes from "./SideBar.module.css";
import { ConnectionContext } from "../../logic/Connection";
import { useContext } from "react";
import Input from "../Input/Input";
import ChatNavigation from "./ChatNavigation/ChatNavigation";
import "primeicons/primeicons.css";

const SideBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { userName, createChat, connect, userChats } = useContext(ConnectionContext);

  return (
    <div className={`${classes.container} ${isHidden ? classes.isHidden : ""}`}>
      <div className={classes.label}>{userName}</div>
      <div className={classes.findChatContainer}>
        <Input
          func={createChat}
          placeHolder={"Чат"}
          width={280}
          style={{ backgroundColor: "bisque" }}
        />
      </div>
      <ul className={classes.options}>
        {userChats?.map((x, i) => (
          <li key={i} className={classes.navBarItem}>
            <ChatNavigation
              chatId={x.Id}
              chatName={x.Name}
              lastMessage="test"
              onClick={connect}
            />
          </li>
        ))}
      </ul>
      <div className={classes.hideButtonContainer}>
        <button
          className={classes.hideButton}
          onClick={() => setIsHidden(!isHidden)}
        >
          <i className="pi pi-caret-left"></i>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
