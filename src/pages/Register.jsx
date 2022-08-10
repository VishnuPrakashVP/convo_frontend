import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { images } from "../constants";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("convo-users", JSON.stringify(data.user));
      }
      navigate("/");
    }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password doesn't match", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be more than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be 8 characters or more");
      return false;
    } else if (email === "") {
      toast.error("Please enter your Email", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="logoDiv">
            <img src={images.logo} alt="logo" />
            <h1>Convo</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(event) => handleChange(event)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => handleChange(event)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(event) => handleChange(event)}
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    @media screen and (max-width: 700px) {
      width: 100vw;
      height: 100vh;
      border-radius: 0px;
      padding: 0.5rem;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #1f4690;
    width: 600px;
    height: 800px;
    padding: 2rem;
    border-radius: 30px;
    box-shadow: 0px 0px 50px 5px rgba(50, 50, 50, 0.2);

    .logoDiv {
      padding-top: 1.5rem;
      display: flex;
      margin-bottom: 2rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 100px;
        height: 100px;
        position: relative;
        right: 5px;
        margin-bottom: 1rem;
      }
      h1 {
        font-weight: 600;
        text-transform: uppercase;
        color: white;
        letter-spacing: 0.5rem;
      }
    }

    input {
      width: 70%;
      height: 3em;
      border-radius: 25px;
      outline: none;
      border: none;
      padding: 2px 20px;
      opacity: 92%;

      &:focus {
        opacity: 1;
      }
    }

    button {
      border: none;
      padding: 0.8em 2.5em;
      border-radius: 25px;
      margin-top: 3rem;
      cursor: pointer;
    }

    span {
      color: white;
      font-size: 12px;
      margin-bottom: 1rem;

      a {
        text-decoration: none;
        color: #3ab4f2;
        padding-left: 0.5rem;
      }
    }
  }
`;

export default Register;
