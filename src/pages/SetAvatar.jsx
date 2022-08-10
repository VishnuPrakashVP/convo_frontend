
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { images } from "../constants";
import { setAvatarRoute } from "../utils/APIRoutes";
import {Buffer} from "buffer";

export default function SetAvatar() {

    const api = "https://api.multiavatar.com/45678945"

    const navigate = useNavigate()

    const [avatars, setAvatars]= useState([])
    const [isLoading, setIsLoading]= useState(true)
    const [selectedAvatar, setSelectedAvatar]= useState(undefined)

    const toastOptions = {
      position: "bottom-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    useEffect(()=>{
      if (!localStorage.getItem("convo-users")) {
        navigate("/login");
      }
      // eslint-disable-next-line
    },[])

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined){
            toast.error ("Please select an avatar", toastOptions)
        }
        else{
            const user = await JSON.parse(
              localStorage.getItem("convo-users")
            );

            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar]
            })

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("convo-users", JSON.stringify(user));
                navigate('/');
            }

            else {
                toast.error("Error setting the avatar. Please try again", toastOptions)
            }
        }
    };

    
    useEffect(() => {
      const fetchData = async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );

          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      };

      fetchData();
      // eslint-disable-next-line
    },[])


  return (
    <>
      {isLoading ? (
        <Container>
          <div className="loader">
            <img src={images.loader} alt="loader" />
            <h1 className="wait">. . . loading . . .</h1>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile Picture
          </button>
        </Container>
      )}

      <ToastContainer></ToastContainer>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #1f4690;
  height: 100vh;
  width: 100vw;

  .loader {
    width: 100%;
    height: 100%;

    background-color: #191919;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    object-fit: contain;

    .wait {
      color: white;
      font-weight: 200;
      font-size: 1.5rem;
      letter-spacing: 0.8rem;

      @media screen and (max-width: 450px) {
        font-size: 1rem;
        letter-spacing: 0.4rem;
      }
    }

    img {
      width: 80%;

      @media screen and (max-width: 450px) {
        width: 100%;
      }
    }
  }

  .title-container {
    h1 {
      color: white;
      font-weight: 200;
      margin-bottom: 2rem;

      @media screen and (max-width: 450px) {
        padding: 1rem;
        text-align: center;
      }
    }
  }

  .avatars {
    width: 70vw;
    height: 30vh;
    // background-color: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0rem 2rem;

    @media screen and (max-width: 770px) {
      width: 50vw;
      height: 50vw;
      display: grid;
      grid-template-columns: 7rem 7rem;
      grid-template-rows: 7rem 7rem;
      grid-gap: 5rem 5rem;
      margin-top: 3rem;
      overflow: hidden;
    }

    @media screen and (max-width: 450px) {
      width: 100%;
      height: 40%;
      display: grid;
      grid-template-columns: 7rem 7rem;
      grid-template-rows: 7rem 7rem;
      grid-gap: 3rem 3rem;
      overflow: hidden;
      padding-top: 1rem;
    }

    .avatar {
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      border: solid #002147 6px;
      transition: 200ms ease-in;
      cursor: pointer;

      &:hover {
        border: solid white 7px;
      }

      &:active {
        border: solid white 7px;
        width: 8rem;
        height: 8rem;
      }
    }

    .selected {
      border: solid white 7px;
      transition: 200ms ease-in;
    }
  }

  .submit-btn {
    border: none;
    padding: 0.8em 2.5em;
    border-radius: 25px;
    margin-top: 3rem;
    cursor: pointer;
    border: solid transparent 3px;
    box-sizing: unset;
    transition: 100ms ease-in;

    &:hover {
      border: solid #002147 3px;
    }
  }
`;
