import classes from './Modal.module.css'
import Input from "../Input/Input";
import { ConnectionContext } from '../../logic/Connection';
import { useContext } from 'react';

const Modal = () => {
    const { login } = useContext(ConnectionContext);
  
    return (
      <div className={classes.modalOverlay}>
        <div className={classes.container}>
          <Input func={login} placeHolder={'Имя'} width={300} />
        </div>
      </div>
    );
  };

export default Modal