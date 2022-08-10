 import React, {useState, useEffect} from 'react';
 import styled from "styled-components";
 import { images } from '../constants';
 import Chat from '../pages/Chat';
 
 const Contacts = ({ contacts, currentUser, changeChat }) => {
   const [currentUserName, setCurrentUserName] = useState(undefined);
   const [currentUserImage, setCurrentUserImage] = useState(undefined);
   const [currentSelected, setCurrentSelected] = useState(undefined);


   useEffect(() => {
     if (currentUser) {
       setCurrentUserImage(currentUser.avatarImage);
       setCurrentUserName(currentUser.username);
     }
   }, [currentUser]);

   const changeCurrentChat = (index, contact) => {

    setCurrentSelected(index);
    changeChat(contact);

   };

   return (
     <>
       {currentUserImage && currentUserName && (
         <Container>
           <div className="brand">
             <img src={images.logo} alt="logo" />
             <h3>convo</h3>
           </div>

           <div className="contacts">
             {contacts.map((contact, index) => {
               return (
                 <div
                   className={`contact ${
                     index === currentSelected ? "selected" : ""
                   }`}
                   key={index}
                   onClick={()=>changeCurrentChat(index, contact)}
                 >
                   <div className="avatar">
                     <img
                       src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                       alt="avatar"
                     />
                   </div>

                   <div className="username">
                     <h3>{contact.username}</h3>
                   </div>
                 </div>
               );
             })}
           </div>

           <div className="current-user">
             <div className="avatar">
               <img
                 src={`data:image/svg+xml;base64,${currentUserImage}`}
                 alt="avatar"
               />
             </div>
             <div className="username">
               <h1>{currentUserName}</h1>
             </div>
           </div>
         </Container>
       )}
     </>
   );
 };

 const Container = styled.div`
   display: grid;
   grid-template-rows: 10% 75% 15%;
   overflow: hidden;

   background-color: #343434;

   height: 100%;
   position: relative;

   .brand {
     display: flex;
     justify-content: center;
     align-items: center;
     margin-top: 2rem;
     gap: 1rem;

     @media screen and (max-width: 600px) {
       display: flex;
       justify-content: center;
       align-items: center;
     }

     @media screen and (max-width: 650px) {
       flex-direction: column;
       justify-content: center;
       align-items: flex-start;
     }

     h3 {
       color: white;
       font-weight: 300;
       letter-spacing: 5px;

       @media screen and (max-width: 600px) {
         display: none;
       }
     }

     img {
       width: 3rem;
     }
   }

   .contacts {
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: flex-start;
     gap: 0.8rem;
     margin: 1.5rem;
     overflow: auto;
     scroll-behavior: smooth;
     padding-top: 5rem;

     &::-webkit-scrollbar {
       display: none;
     }

     .contact {
       display: flex;
       min-height: 5rem;
       width: 100%;
       padding: 0.7rem 1rem;
       flex-direction: row;
       justify-content: flex-start;
       align-items: center;
       gap: 1rem;
       background-color: rgba(255, 255, 255, 0.1);
       border-radius: 20px;
       cursor: pointer;

       @media screen and (max-width: 600px) {
         justify-content: flex-start;
         align-items: flex-start;
       }

       @media screen and (max-width: 650px) {
         background-color: rgba(255, 255, 255, 0);
         justify-content: flex-start;
         align-items: flex-start;
       }

       @media screen and (max-width: 850px) {
         flex-direction: column;
         justify-content: center;
         align-items: center;
         gap: 0.5rem;
       }

       .avatar {
         width: 3rem;

         @media screen and (max-width: 850px) {
           width: 2rem;
         }
       }

       .username {
         h3 {
           color: white;
           max-width: 12ch;
           scroll-behavior: smooth;
           scrollbar-width: none;
           overflow: auto;
           font-weight: 200;
           letter-spacing: 4px;
           text-transform: capitalize;

           @media screen and (max-width: 850px) {
             width: 8ch;
             font-size: 1rem;
             text-align: center;
           }

           &::-webkit-scrollbar {
             display: none;
           }
         }
       }

       transition: 200ms ease-in-out;
     }

     .selected {
       background-color: rgba(255, 255, 255, 0.3);
     }
   }

   .current-user {
     display: flex;
     gap: 1rem;
     margin: 1.5rem;
     margin-top: 0rem;
     padding-top: 1.5rem;
     justify-content: center;
     align-items: center;
     border-top: 2px solid rgba(255, 255, 255, 0.2);

     @media screen and (max-width: 850px) {
       flex-direction: column;
       gap: 0.4rem;
     }

     .avatar {
       width: 4rem;

       @media screen and (max-width: 850px) {
         width: 2rem;
       }
     }

     .username {
       h1 {
         color: white;
         font-size: 1.8rem;
         font-weight: 200;
         max-width: 7ch;
         font-size: 1.2rem;
         display: inline;
         text-wrap: nowrap;
         inline-size: 7ch;

         @media screen and (max-width: 850px) {
           font-size: 1rem;
         }
       }
     }
   }
 `;
 
 export default Contacts