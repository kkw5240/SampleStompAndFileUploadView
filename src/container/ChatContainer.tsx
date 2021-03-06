import * as React from "react";
import { ChatPresenter } from "../presenter/ChatPresenter";
//import "./ChatContainer.scss";
import { message } from "antd";
import {useEffect} from "react";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import DragDrop from "./DragDrop";

export type message = {
  username: string;
  content: string;
};

let sockJS = new SockJS("http://localhost:8080/webSocket");
let stompClient : Stomp.Client = Stomp.over(sockJS);
stompClient.debug= () => {};

export const ChatContainer = ({}) => {
  const [contents, setContents] = React.useState<message[]>([]);
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState("");

  useEffect(()=>{
    stompClient.connect({},()=>{
      stompClient.subscribe('/topic/roomId',(data)=>{
        const newMessage : message = JSON.parse(data.body) as message;
        addMessage(newMessage);
      });
  });
  },[contents]);
  
  const handleEnter = (username: string, content: string) => {
    const newMessage: message = { username, content };
    stompClient.send("/hello",{},JSON.stringify(newMessage));
    setMessage("");
  };

  const addMessage = (message : message) =>{
    setContents(prev=>[...prev, message]);
  };

  return (
    <div className={"container"}>
      <ChatPresenter
        contents={contents}
        handleEnter={handleEnter}
        message={message}
        setMessage={setMessage}
        username={username}
        setUsername={setUsername}
      />
      <DragDrop />
    </div>
  );
};
