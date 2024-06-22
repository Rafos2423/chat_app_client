import classes from "./Message.module.css";
import { memo } from "react";

const Message = memo(({ text, isMyMessage, receiveAt }) => {
  return (
    <div
      className={`${classes.container} ${
        isMyMessage ? classes.left : classes.right
      }`}
    >
      <div className={classes.wrapper}>
        <div className={classes.message}>
          {text}
          <span className={classes.time}>{receiveAt}</span>
        </div>
      </div>
    </div>
  );
});

export default Message;
