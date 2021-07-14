import * as React from "react";
//import "./ChatPresenter.scss";
import { Button, Input } from "antd";
import { message } from "../container/ChatContainer";

type ChatPresenterProps = {
  contents: Array<message>;
  message: string;
  username : string;
  setMessage: Function;
  setUsername : Function;
  handleEnter: Function;
};

const test = (e:object) => {
    console.log(e);
};

export const ChatPresenter = ({
  contents,
  message,
  username,
  setMessage,
  setUsername,
  handleEnter,
}: ChatPresenterProps) => {
  return (
    <div className={"chat-box"}>
      <div className='header'>
        유저이름 : 
        <Input
          style={{flex : 1}}
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
      </div>
      <div className={"contents"}
           onDrop={e=>alert(e)}>
        {contents.map((message, index) => (
          <div key={index}> {message.username} : {message.content} </div>
        ))}
      </div>
      <div>
        <Input.Search
          placeholder="input your messages..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onSearch={(value) => handleEnter(username,value)}
          enterButton={"Enter"}
        />
      </div>
    </div>
  );
};
