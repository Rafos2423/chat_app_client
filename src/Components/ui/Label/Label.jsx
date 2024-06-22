import classes from './Label.module.css'
import { useRef } from 'react';

const Label = ({text, maxWidth}) => {
    const textRef = useRef(null);
    console.log(textRef.current?.offsetWidth)
    return <span ref={textRef}>{text}</span>
};

export default Label
