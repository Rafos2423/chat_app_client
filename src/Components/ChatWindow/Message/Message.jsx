import classes from './Message.module.css'

const Message = ({text, isMyMessage, receiveAt}) => {
    return (
        <div className={`${classes.container} ${isMyMessage ? classes.left : classes.right}`}>
            <div className={classes.wrapper}>
                <div className={classes.message}>
                    {text}
                </div>
                <div className={classes.time}>
                    {receiveAt}
                </div>
            </div>
        </div>
    )
}

export default Message;