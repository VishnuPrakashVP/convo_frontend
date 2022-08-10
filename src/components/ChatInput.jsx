import React, {useState} from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"

const ChatInput = ({handleSendMessage}) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [ msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event, emoji) => {
    let message  = msg;
    message += emoji.emoji;
    setMsg(message);
  }

  const sendChat = (event) =>{
    event.preventDefault();
    if(msg.length>0){
      handleSendMessage(msg);
      setMsg("")
      console.log(msg)
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <EmojiPicker  onEmojiClick={handleEmojiClick} onBlur={handleEmojiPickerHideShow}/>}
        </div>
      </div>

      <form className="input-container" >
        <input type="text" placeholder="Type your message here" value={msg} onChange={(e)=> setMsg(e.target.value)}/>
        <button className="submit" onClick={(e)=>sendChat(e)}>
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  height: 2.5rem;
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #1f4690;
  padding: 0rem 1rem;
  gap: 1.5rem;
  position: relative;

  border-radius: 5rem;

  .button-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .emoji {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      color: #ffcb4c;
      font-size: 1.3rem;
      cursor: pointer;
      position: relative;

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        left: 0;

        .content-wrapper-epr {
          .emoji-scroll-wrapper {
            &::-webkit-scrollbar {
              width: 0.5rem;
            }

            &::-webkit-scrollbar-thumb {
              background-color: rgba(50, 50, 50, 0.7);
              border-radius: 0.5rem;
            }

            &::-webkit-scrollbar-track {
              background-color: rgba(50, 50, 50, 0.1);
              border-radius: 0.5rem;
            }
          }
        }
      }
    }
  }

  .input-container {
    width: 95%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      background-color: transparent;
      border: none;
      outline: none;
      color: white;
      width: 85%;

      &::selection {
        background-color: rgba(255, 255, 255, 0.3);
      }

      &::placeholder {
        color: white;
        opacity: 0.3;
      }
    }

    button {
      color: white;
      position: absolute;
      right: 0;
      background-color: #1487f8;
      width: 4.5rem;
      height: 100%;
      display: flex;
      float: right;
      justify-content: center;
      align-items: center;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border-radius: 5rem;
      border: none;
      font-size: 1.5rem;
      display: flex;
      cursor: pointer;
    }
  }
`;

export default ChatInput