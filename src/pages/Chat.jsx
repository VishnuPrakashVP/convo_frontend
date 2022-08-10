import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {allUsersRoute, host} from "../utils/APIRoutes"
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from "socket.io-client";




function Chat(){
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false)
  

  const navigate = useNavigate();

  useEffect(()=> {
    const fetchData = async () => {
      if (!localStorage.getItem("convo-users")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("convo-users")));
        setIsLoaded(true);
      }
    };

    fetchData();
    // eslint-disable-next-line
  },[])

  
  useEffect(()=>{
    const fetchData = async() => {
      if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user", currentUser._id);
      }
    }
    fetchData();
  },[currentUser])




  useEffect(()=>{
    const checkData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    checkData();
    // eslint-disable-next-line
  },[currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />

        {isLoaded && currentChat === undefined ? (
          <Welcome presentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser}  socket={socket}/>
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1f4690;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    width: 80vw;
    height: 80vh;
    background-color: rgb(255, 255, 255);
    border-radius: 25px;
    box-shadow: 0px 0px 200px 5px rgba(50, 50, 50, 0.2);

    display: grid;
    grid-template-columns: 35% 65%;
    overflow: hidden;

    @media screen and (max-width: 850px) {
      grid-template-columns: 25% 75%;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
    }

    
  }
`;

export default Chat