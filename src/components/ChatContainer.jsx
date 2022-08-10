import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid"

const ChatContainer = ({ currentChat, currentUser, socket }) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(()=>{

    if(currentChat) {
      const fetchData = async () => {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      };
      fetchData();
    }
  },[currentChat])


  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({fromSelf:true,
    message: msg});
    setMessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive",(msg)=> {
        setArrivalMessage({fromSelf: false, message: msg})
      });
    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=> [...prev, arrivalMessage])
  },[arrivalMessage]);


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: "smooth"});
  },[messages])


  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className="chat-messages">
            {
              messages.map((message)=> {
                return (
                  <div ref={scrollRef} key={uuidv4()} >
                    <div className={`message ${message.fromSelf ? "sent" : " received"}`}>
                      <div className="content">
                        <p>
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding: 1rem;
  display: grid;
  align-items: center;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  gap: 1rem;
  max-height: 100%;
  padding-top: 3rem;

  .chat-header {
    display: flex;
    justify-content: space-between;

    .user-details {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 1.5rem;

      .avatar {
        img {
          width: 3rem;
        }
      }

      .username {
        h3 {
          color: #1f4690;
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: 0.2rem;
        }
      }
    }
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    min-height: 100%;
    overflow-y: scroll;
    gap: 1rem;
    padding-right: 0.5rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(50, 50, 50, 0.2);
      border-radius: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      &:valid {
        background-color: rgba(50, 50, 50, 0.1);
      }

      border-radius: 0.5rem;
    }

    .message {
      display: flex;
      align-items: center;
      justify-content: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.5rem 1rem 0.5rem 1rem;

        color: red;
      }
    }

    .sent {
      justify-content: flex-end;

      .content {
        background-color: #0080d8;
        border-radius: 1.5rem 1.5rem 0rem 1.5rem;

        p {
          color: white;
        }
      }
    }

    .received {
      justify-content: flex-start;

      .content {
        background-color: rgba(50, 50, 50, 0.2);
        border-radius: 1.5rem 1.5rem 1.5rem 0rem;

        p {
          color: black;
        }
      }
    }
  }
`;

export default ChatContainer