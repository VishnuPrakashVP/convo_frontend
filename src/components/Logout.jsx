import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GoSignOut } from "react-icons/go";

const Logout = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login")
    }
  return (
    <Button onClick={()=> handleClick()}>
      Logout<GoSignOut />
    </Button>
  );
}

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  


  width: 7rem;
  background-color: #1f4690;
  height: 2.2rem;
  border-radius: 2rem;
  color: white;
  font-weight: 600;
  font-size:0.8rem;

`;

export default Logout