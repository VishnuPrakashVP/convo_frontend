import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import "./index.css"
import SetAvatar from './pages/SetAvatar';
import styled from "styled-components";


const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <div className="mobile-version">
          <h1>...We are coming soon on mobile devices...</h1>
        </div>
        <Routes className="routes">
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
  .mobile-version {
    display: none;

    @media screen and (max-width: 800px) {
      display: grid;
      place-items: center;
      position: fixed;
      top: 0vh;
      height: 100vh;
      width: 100vw;
      z-index: 1000;
      background-color: white;
      pointer-events: none;

      h1 {
        font-weight: 400;

        font-size: 1rem;
      }
    }
  }

  .routes {
    @media screen and (max-width: 800px) {
      display: none;
      z-index: 0;
    }
  }
`;

export default App