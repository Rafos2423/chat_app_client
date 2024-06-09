import classes from './Message.module.css'

const Message = ({text}) => {
    return (
        <div className={classes.container}>
            <div className={classes.message}>{text}</div>
        </div>
    )
}

export default Message;