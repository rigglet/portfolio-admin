import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import profile from "../images/profile.svg";
import organise from "../images/organise.svg";
//auth
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { HiChevronDown } from "react-icons/hi";

function Bar() {
  const username = "Neil";
  return (
    <StyledBar>
      <div className="header-logo">
        <img id="logo" src={organise} alt="logo" />
        <h1 id="title">Portfolio Administration</h1>
      </div>
      <div className="header-profile">
        <img className="profileImg" src={profile} alt="profile" />
        <h4 className="username">{username}</h4>
        <HiChevronDown className="chevron" />
      </div>
    </StyledBar>
  );
}

const StyledBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #494c48;
  width: 100vw;
  height: 9vh;
  font-size: 1rem;
  font-weight: 400;
  //padding: 0.25rem;
  border-bottom: 2px solid white;

  .header-logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    #logo {
      width: 4rem;
      height: 4rem;
      margin-left: 1rem;
    }
    #title {
      font-family: "Lobster Two", cursive;
      color: #dddddd;
    }
  }
  .header-profile {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    gap: 1rem;
    .username {
      color: white;
    }
    .profileImg {
      width: 2.5rem;
      height: 2.5rem;
    }
    .chevron {
      width: 1.5rem;
      height: 1.5rem;
      color: white;
      &:hover {
        background-color: #73797e;
        border-radius: 50%;
      }
    }
  }
`;

export default Bar;
