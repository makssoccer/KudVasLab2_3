import './App.css';
import Header from "./Header/Header";
import Body from "./Body/Body";
import Menu from "./Menu/Menu"
import {useEffect, useState} from "react";
import {collection, onSnapshot} from "@firebase/firestore";
import db from "./firebase";

function App() {

    //When the app is begin that we start on inP
    const [active_list, setActive_list]=useState('To do list');
    const handleTitleChange = (active_list)=>{
        setActive_list(active_list);
    }


    // handleTaskCountChange change task's count and push it to Header
    const [count_task, setCount]=useState();
    const handleTaskCountChange = (count_task) =>{
        setCount(count_task);
    }

  return (
    <div className="wrapApp">
      <div className="App">
      <Header count_tasks={count_task}/>
      <Menu classNeme='menu' onClick={handleTitleChange}/>
      <Body className='body' onChange={handleTaskCountChange} active={active_list}/>
      </div>
    </div>

  );
}

export default App;
