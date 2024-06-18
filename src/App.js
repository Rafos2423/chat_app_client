import SideBar from "./Components/ui/SideBar/SideBar";
import './App.css';
import React, { useContext } from 'react';
import Modal from "./Components/ui/Modal/Modal";
import ChatWindow from "./Components/ui/ChatWindow/ChatWindow";
import { ConnectionContext} from './Components/logic/Connection';


function App() {
  let { isModalVisible } = useContext(ConnectionContext);

  return (
    <div className="App">
        {isModalVisible ? <Modal /> :
          <>
            <SideBar />
            <ChatWindow />
          </>
        }
    </div>
  );
}

export default App;