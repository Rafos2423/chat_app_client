import { useState } from 'react';
import classes from './SideBar.module.css'

const SideBar = (props) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className={`${classes.container} ${isHidden ? classes.isHidden : ""}`}>
            <div className={classes.options}></div>
            <div className={classes.hideButtonContainer}>
                <button className={classes.hideButton} onClick={() => setIsHidden(!isHidden)}>Скрыть</button>
            </div>
        </div>
    )
}

export default SideBar;