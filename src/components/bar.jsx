import { useState } from "react";
//styling
import styled from "styled-components";
import { motion } from "framer-motion";
//images
import profile from "../images/profile.svg";
import organise from "../images/organise.svg";
//icons
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FiLogOut, FiSettings } from "react-icons/fi";
//import { FiSettings } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
//components
import Profile from "./profile";
import Settings from "./settings";
//server base url
import { baseURL as SERVER_BASE_URL, imagePath } from "../config/config";

function Bar({ auth, setAuth, settings, setSettings }) {
  const [menu, toggleMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showViewProfile, setShowViewProfile] = useState(false);
  const [showViewSettings, setShowViewSettings] = useState(false);
  const { username } = auth;

  const savedFilename = auth.profileImageUrl?.fileName || null;
  const fullPathToFile = `${SERVER_BASE_URL()}/${imagePath()}/${savedFilename}`;

  const logOut = () => {
    setAuth({});
  };

  const listvariants = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: {
      opacity: 0,
      height: "0%",
      transition: { duration: 0.3 },
    },
  };
  const itemListVariants = {
    open: { display: "flex" },
    closed: {
      transitionEnd: { dislay: "none" },
    },
  };

  return (
    <StyledBar>
      {showViewSettings && (
        <Settings
          auth={auth}
          //setAuth={setAuth}
          openingHookSetter={setShowViewSettings}
          title={"Settings"}
          formType={"VIEW"}
          settings={settings}
          setSettings={setSettings}
        />
      )}

      {showEditProfile && (
        <Profile
          auth={auth}
          setAuth={setAuth}
          openingHookSetter={setShowEditProfile}
          title={"Edit profile"}
          formType={"EDIT"}
        />
      )}

      {showViewProfile && (
        <Profile
          auth={auth}
          setAuth={setAuth}
          openingHookSetter={setShowViewProfile}
          title={"View profile"}
          formType={"VIEW"}
        />
      )}

      {menu && (
        <div className="bar-background" onClick={() => toggleMenu(!menu)}>
          <ul
            className="bar-menu"
            animate={menu ? "open" : "closed"}
            listvariants={listvariants}
          >
            <li className="bar-list-item" listvariants={itemListVariants}>
              <div className="profile-menu-item">
                <BiUser className="profile-menu-icon" />
                <h3
                  onClick={() => {
                    toggleMenu(!menu);
                    setShowEditProfile(!showEditProfile);
                  }}
                >
                  Edit Profile
                </h3>
              </div>
            </li>
            <li className="bar-list-item" listvariants={itemListVariants}>
              <div className="profile-menu-item">
                <FiSettings className="profile-menu-icon" />
                <h3
                  onClick={() => {
                    toggleMenu(!menu);
                    setShowViewSettings(!showViewSettings);
                  }}
                >
                  Settings
                </h3>
              </div>
            </li>
            <li className="bar-list-item" listvariants={itemListVariants}>
              <div className="profile-menu-item">
                <FiLogOut className="profile-menu-icon" />
                <h3 onClick={() => logOut()}>Logout</h3>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="header-logo">
        <img id="logo" src={organise} alt="logo" />
        <h1 id="title">Portfolio Administration</h1>
      </div>
      <div className="header-profile">
        <h4 className="username">{username}</h4>
        <div className="image-container">
          <img
            className="profileImg"
            src={savedFilename ? fullPathToFile : profile}
            alt="view profile"
            onClick={() => setShowViewProfile(!showViewProfile)}
          />
        </div>

        {menu ? (
          <HiChevronUp onClick={() => toggleMenu(!menu)} className="chevron" />
        ) : (
          <HiChevronDown
            onClick={() => toggleMenu(!menu)}
            className="chevron"
          />
        )}
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
  position: relative;
  .show {
    opacity: 100;
  }
  .hide {
    opacity: 0;
  }
  .bar-background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 98;
    background-color: rgba(255, 255, 255, 0);
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
      list-style: none;
      //margin: 1rem 0 0 0;
      .bar-list-item {
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
            color: #313131;
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
      cursor: default;
    }
  }
  .header-profile {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    gap: 2rem;
    .username {
      color: white;
      font-weight: 400;
      font-size: 12pt;
      cursor: default;
    }
    .image-container {
      background: whitesmoke;
      min-width: 2.8rem;
      height: 2.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid transparent;
      &:hover {
        //can't round corners of outline, so use box-shadow
        box-shadow: 0 0 0 1px white;
      }
      .profileImg {
        width: 45px;
        height: 45px;
        cursor: pointer;
        object-fit: scale-down;
        object-position: 50% 50%;
      }
    }
    .chevron {
      width: 1.5rem;
      height: 1.5rem;
      color: white;
      &:hover {
        background-color: #688297;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }

  //#### RESPONSIVE SECTION ####

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: portrait) {
    position: static;

    .bar-background {
      .bar-menu {
        width: 100vw;
        height: auto;
        top: 9vh;
        left: 0vw;
      }
    }
    .header-logo {
      height: 100%;
      margin-left: 0.5rem;
      gap: 1rem;
      #logo {
        display: none;
      }
      #title {
        font-size: 1.3rem;
      }
    }
    .header-profile {
      justify-content: center;
      //margin-right: 1rem;
      gap: 2rem;
      .username {
        font-size: 10pt;
      }
      .image-container {
        .profileImg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    position: static;

    .bar-background {
      .bar-menu {
        width: 100vw;
        height: auto;
        top: 9vh;
        left: 0vw;
      }
    }
    .header-logo {
      height: 100%;
      margin-left: 0.5rem;
      gap: 1rem;
      #logo {
        display: none;
      }
      #title {
        font-size: 1.3rem;
      }
    }
    .header-profile {
      justify-content: center;
      //margin-right: 1rem;
      gap: 2rem;
      .username {
        font-size: 10pt;
      }
      .image-container {
        min-width: 2rem;
        height: 2rem;
        .profileImg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  //481px — 768px: iPads, Tablets
  @media screen and (min-width: 481px) and (max-width: 769px) and (orientation: portrait) {
  }

  //481px — 768px: iPads, Tablets
  //@media screen and (min-width: 481px) and (max-width: 769px) and (orientation: landscape) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {}

  //1025px — 1200px: Desktops, large screens
  @media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {
  }

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  @media screen and (min-width: 1921px) and (orientation: landscape) {
  }
`;

export default Bar;
