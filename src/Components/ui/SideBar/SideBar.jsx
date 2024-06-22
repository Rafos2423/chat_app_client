import { useState } from "react";
import classes from "./SideBar.module.css";
import { ConnectionContext } from '../../logic/Connection';
import { useContext } from 'react';
import Input from "../Input/Input";
import ChatNavigation from "./ChatNavigation/ChatNavigation";

const SideBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { userName, connect, messageHistory } = useContext(ConnectionContext);

  return (
    <div className={`${classes.container} ${isHidden ? classes.isHidden : ""}`}>
      <div className={classes.label}>{userName}</div>
      <div className={classes.findChatContainer}>
        <Input func={connect} placeHolder={'Чат'} width={270} style={{ backgroundColor: "bisque"}}/>
      </div>
      <ul className={classes.options}>
        {Object.keys(messageHistory)?.map((x, i) => 
          <li key={i} className={classes.navBarItem}><ChatNavigation chatName={x} lastMessage={messageHistory[x].at(-1)} onClick={connect}/></li>
        )}
      </ul>
      <div className={classes.hideButtonContainer}>
      <button
          className={classes.hideButton}
          onClick={() => setIsHidden(!isHidden)}
        >
          &lt;&lt;
        </button>
      </div>
    </div>
  );
};

export default SideBar;
