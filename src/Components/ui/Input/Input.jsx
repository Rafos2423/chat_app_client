import classes from './Input.module.css'
import { useState } from 'react';

const Input = ({func, placeHolder, width, isDark=false}) =>
{
    const [inputText, setInputText] = useState("");

    const handleKeyPress = (event, func) => {
        if (event.key === 'Enter' && event.target.value) {
            func(event.target.value);
            setInputText("");
        }
    };

    return <input type='text' className={`${classes.inputField} ${isDark ? classes.dark : ""}`} placeholder={placeHolder} style={{ width: width }}
        value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={e => handleKeyPress(e, func)}/>
}

export default Input