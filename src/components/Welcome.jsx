import React from 'react';
import styled from 'styled-components';
import { images } from '../constants';

const Welcome = ( {presentUser} ) => {
    
    
    
  return (
    <Container>
      <img src={images.welcome2} alt="welcome" />
      <h3>
        welcome, <span>{presentUser.username}!</span>
      </h3>
      <h5>---Please select a contact to start messaging---</h5>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  img {
    width: 20rem;
  }

  h3 {
    text-transform: capitalize;
    font-weight: 400;
    letter-spacing: 0.2rem;
    color: #1f4690;
    font-size: 1.5rem;

    span {
      font-weight: 800;
    }
  }

  h5 {
    font-weight: 300;
    letter-spacing: 0.1rem;
    padding-top: 5rem;
  }
`;

export default Welcome