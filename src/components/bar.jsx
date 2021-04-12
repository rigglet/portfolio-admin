//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//images
import profile from "../images/profile.svg";
import organise from "../images/organise.svg";
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
  background-color: #011e44;
  width: 100vw;
  height: 9vh;
  font-size: 1rem;
  font-weight: 400;
  //padding: 0.25rem;
  border-bottom: 2px solid white;

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
