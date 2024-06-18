import { useState, useEffect } from "react";
import classes from "./SideBar.module.css";

const SideBar = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Скрыть");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setButtonLabel(isHidden ? "Открыть" : "Скрыть");
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [isHidden]);

  return (
    <div className={`${classes.container} ${isHidden ? classes.isHidden : ""}`}>
      <div className={classes.options}></div>
      <div className={classes.hideButtonContainer}>
        <button
          className={classes.hideButton}
          onClick={() => setIsHidden(!isHidden)}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
