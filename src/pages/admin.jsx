import React, { useState } from "react";
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import curve from "../images/curve.svg";
//import loginPic from "../images/login.svg";
import login2 from "../images/login2.svg";
//import organise from "../images/organise.svg";
import profile from "../images/profile.svg";

function Admin() {
  return (
    <StyledAdmin>
      <img src={curve} alt="curve" id="curve" />
      {/* <img src={loginPic} alt="login" />
      <img src={login2} alt="login2" />
      <img src={profile} alt="profile" />
      <img src={organise} alt="organise" /> */}

      <div className="title">
        <h1>Administration</h1>
      </div>
    </StyledAdmin>
  );
}

const StyledAdmin = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .title {
    position: fixed;
    width: 100vw;
    display: flex;
    margin: 2rem;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export default Admin;
