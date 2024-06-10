import classes from './Modal.module.css'

const Modal = ({isVisible, value, setValue, onKeyPress}) =>
{
    return (
        <div className={`${classes.modalOverlay} ${isVisible ? classes.visible : classes.hide}`}>
            <div className={classes.container}>
                <input type='text' className={classes.inputField} placeholder='Имя'
                    value={value} onChange={setValue}
                    onKeyPress={onKeyPress}/>
            </div>
        </div>
    )
}

export default Modal