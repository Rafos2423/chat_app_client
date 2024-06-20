import { useState } from "react";
import classes from "./SideBar.module.css";
import { ConnectionContext } from '../../logic/Connection';
import { useContext } from 'react';
import Input from "../Input/Input";

const SideBar = () => {
  const [isHidden, setIsHidden] = useState(false);

  const { userName, connect } = useContext(ConnectionContext);

  return (
    <div className={`${classes.container} ${isHidden ? classes.isHidden : ""}`}>
      <div className={classes.addButtonContainer}>
        <Input func={connect} placeHolder={'Чат'} width={270} style={{ backgroundColor: "bisque"}}/>
      </div>
      <div className={classes.options}></div>
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
