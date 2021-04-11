import React, { useState, useEffect } from "react";
import styled from "styled-components";
//import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
//import profile from "../images/profile.svg";
//auth
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

function Nav() {
  return (
    <StyledNav>
      <ul>
        <li>Projects</li>
        <li>Links</li>
        <li>Technologies</li>
      </ul>
    </StyledNav>
  );
}

const StyledNav = styled(motion.div)`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #73797e;
  width: 15.5vw;
  height: 100vh;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem;
  //overflow-y: hidden;
`;

export default Nav;
