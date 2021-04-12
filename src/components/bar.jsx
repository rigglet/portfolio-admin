import { useState } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//images
import profile from "../images/profile.svg";
import organise from "../images/organise.svg";
//icons
import { HiChevronDown } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { BiUser } from "react-icons/bi";

function Bar() {
  const [menu, toggleMenu] = useState(false);
  const username = "Neil";

  const logOut = () => {
    toggleMenu(!menu);
    console.log("Logging out...");
  };
  const showProfile = () => {
    toggleMenu(!menu);
    console.log("Profile...");
  };
  const showSettings = () => {
    toggleMenu(!menu);
    console.log("Settings...");
  };

  const variants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: {
      opacity: 0,
      height: "0%",
      transition: { duration: 0.3 },
    },
  };

  return (
    <StyledBar>
      <motion.div
        className="bar-menu"
        animate={menu ? "open" : "closed"}
        variants={variants}
      >
        <ul>
          <li>
            <div className="profile-menu-item">
              <BiUser className="profile-menu-icon" />
              <h3 onClick={() => showProfile()}>Profile</h3>
            </div>
          </li>
          <li>
            <div className="profile-menu-item">
              <FiSettings className="profile-menu-icon" />
              <h3 onClick={() => showSettings()}>Settings</h3>
            </div>
          </li>
          <li>
            <div className="profile-menu-item">
              <FiLogOut className="profile-menu-icon" />
              <h3 onClick={() => logOut()}>Logout</h3>
            </div>
          </li>
        </ul>
      </motion.div>
      <div className="header-logo">
        <img id="logo" src={organise} alt="logo" />
        <h1 id="title">Portfolio Administration</h1>
      </div>
      <div className="header-profile">
        <img className="profileImg" src={profile} alt="profile" />
        <h4 className="username">{username}</h4>
        <HiChevronDown onClick={() => toggleMenu(!menu)} className="chevron" />
      </div>
    </StyledBar>
  );
}

const StyledBar = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #011e44;
  width: 100vw;
  height: 9vh;
  font-size: 1rem;
  font-weight: 400;
  //padding: 0.25rem;
  border-bottom: 2px solid white;

  .show {
    opacity: 100;
  }
  .hide {
    opacity: 0;
  }
  .bar-menu {
    z-index: 99;
    width: 20vw;
    //height: 100px;
    position: absolute;
    top: 9.5vh;
    right: 0.5vw;
    border: 1px solid #011e44;
    background: #688297;
    color: #011e44;
    border-radius: 4px;
    ul {
      //margin: 1rem 0 0 0;
      width: 100%;
      list-style: none;
      li {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        cursor: pointer;
        .profile-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          //justify-content: space-between;
          gap: 1rem;
          h3 {
            color: white;
            font-weight: 200;
            font-size: 0.9rem;
          }
          .profile-menu-icon {
            width: 1.2rem;
            height: 1.2rem;
          }
        }
      }
    }
  }
  .header-logo {
    display: flex;
    align-items: center;
    gap: 12rem;
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
    gap: 2rem;
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
        background-color: #688297;
        border-radius: 50%;
      }
    }
  }
`;

export default Bar;
