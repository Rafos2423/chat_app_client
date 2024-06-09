import ChatWindow from "./Components/ChatWindow/ChatWindow";
import SideBar from "./Components/SideBar/SideBar";
import './App.css';

function App() {
  return (
    <div className="App">
      <SideBar/>
      <ChatWindow messages={["43252", "423"]}/>
    </div>
  );
}

export default App;