import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//react router
import { Link, useLocation } from "react-router-dom";
//icons
import { ImImages } from "react-icons/im";
import {
  FaTools,
  //FaMapSigns
} from "react-icons/fa";
import { HiChevronDown, HiChevronUp, HiCode, HiLink } from "react-icons/hi";
import { MdWeb } from "react-icons/md";
import { IoLibraryOutline, IoText } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
//import { FiVideo } from "react-icons/fi";

function Nav({
  projectNo,
  linkNo,
  techNo,
  libNo,
  packageNo,
  imageNo,
  toolNo,
  roadmapNo,
  videoNo,
  textNo,
}) {
  const [projectChevron, setProjectChevron] = useState(false);
  const [siteChevron, setSiteChevron] = useState(false);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  //framer motion
  const container = {
    open: {
      opacity: 1,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
    closed: {
      height: "0px",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };
  const item = {
    open: {
      opacity: 1,
      display: "flex",
      transition: { duration: 0.3 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
      transitionEnd: {
        display: "none",
      },
    },
  };

  return (
    <StyledNav>
      <div className="nav-heading">
        <h3>Projects</h3>
        {projectChevron ? (
          <HiChevronUp
            onClick={() => setProjectChevron(!projectChevron)}
            className="nav-chev"
          />
        ) : (
          <HiChevronDown
            onClick={() => setProjectChevron(!projectChevron)}
            className="nav-chev"
          />
        )}
      </div>
      <motion.ul
        animate={projectChevron ? "open" : "closed"}
        variants={container}
      >
        <motion.li
          variants={item}
          className={path === "projects" ? "selected" : ""}
        >
          <Link
            to="/admin/projects"
            className={path === "projects" ? "selected" : ""}
          >
            <div className="link-info">
              <MdWeb className="nav-icon" />
                Projects
            </div>
            <div className="link-amount">
              <h4>{projectNo}</h4>
            </div>
          </Link>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "tech" ? "selected" : ""}
        >
          <Link
            className={path === "tech" ? "selected" : ""}
            to="/admin/tech"
          >
            <div className="link-info">
              <HiCode className="nav-icon" />
                Technologies
            </div>
            <div className="link-amount">
              <h4>{techNo}</h4>
            </div>
          </Link>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "libraries" ? "selected" : ""}
        >
          <Link
            className={path === "libraries" ? "selected" : ""}
            to="/admin/libraries"
          >
            <div className="link-info">
              <IoLibraryOutline className="nav-icon" />
                Libraries
            </div>
            <div className="link-amount">
              <h4>{libNo}</h4>
            </div>
          </Link>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "packages" ? "selected" : ""}
        >
          <Link
            className={path === "packages" ? "selected" : ""}
            to="/admin/packages"
          >
            <div className="link-info">
              <GoPackage className="nav-icon" />
                Packages
            </div>
            <div className="link-amount">
              <h4>{packageNo}</h4>
            </div>
          </Link>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "images" ? "selected" : ""}
        >
          <Link
            className={path === "images" ? "selected" : ""}
            to="/admin/images"
          >
            <div className="link-info">
              <ImImages className="nav-icon" />
                Images
            </div>
            <div className="link-amount">
              <h4>{imageNo}</h4>
            </div>
          </Link>
        </motion.li>
        {/* <motion.li
          variants={item}
          className={path === "video" ? "selected" : ""}
        >
          <div className="link-info">
            <FiVideo className="nav-icon" />
            <Link
              className={path === "video" ? "selected" : ""}
              to="/admin/video"
            >
              Videos
            </Link>
          </div>
          <div className="link-amount">
            <h4>{videoNo}</h4>
          </div>
        </motion.li> */}
      </motion.ul>
      
      <div className="nav-heading">
        <h3>Site</h3>
        {siteChevron ? (
          <HiChevronUp
            onClick={() => setSiteChevron(!siteChevron)}
            className="nav-chev"
          />
        ) : (
          <HiChevronDown
            onClick={() => setSiteChevron(!siteChevron)}
            className="nav-chev"
          />
        )}
      </div>
      <motion.ul animate={siteChevron ? "open" : "closed"} variants={container}>
        <motion.li
          variants={item}
          className={path === "tools" ? "selected" : ""}
        >
          <Link
            className={path === "tools" ? "selected" : ""}
            to="/admin/tools"
          >
            <div className="link-info">
              <FaTools className="nav-icon" />
                Tools
            </div>
            <div className="link-amount">
              <h4>{toolNo}</h4>
            </div>
          </Link>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "links" ? "selected" : ""}
        >
          <Link
            className={path === "links" ? "selected" : ""}
            to="/admin/links"
          >
            <div className="link-info">
              <HiLink className="nav-icon" />
                Links
            </div>
            <div className="link-amount">
              <h4>{linkNo}</h4>
            </div>
          </Link>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "texts" ? "selected" : ""}
        >
          <Link
            className={path === "texts" ? "selected" : ""}
            to="/admin/texts"
          >
            <div className="link-info">
              <IoText className="nav-icon" />
                Text
            </div>
            <div className="link-amount">
              <h4>{textNo}</h4>
            </div>
          </Link>
        </motion.li>
        {/* <motion.li
          variants={item}
          className={path === "roadmap" ? "selected" : ""}
        >
          <div className="link-info">
            <FaMapSigns className="nav-icon" />
            <Link
              className={path === "roadmap" ? "selected" : ""}
              to="/admin/roadmaps"
            >
              Roadmap
            </Link>
          </div>
          <div className="link-amount">
            <h4>{roadmapNo}</h4>
          </div>
        </motion.li> */}
      </motion.ul>
    </StyledNav>
  );
}

const StyledNav = styled(motion.div)`
  position: absolute;
  top: 9vh;
  left: 0;
  //z-index: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  background-color: #688297;
  width: 15.5vw;
  height: 91vh;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25rem 0 0.25rem 0.25rem;

  .nav-heading {
    padding: 0 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.5s ease-in;

    h3 {
      width: 100%;
      padding: 0.5rem 0 0 1rem;
      font-weight: 400;
      font-size: 12pt;
    }
    .nav-chev {
      cursor: pointer;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  ul {
    margin: 1rem 0 0 0;
    width: 100%;
    list-style: none;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      cursor: pointer;
      border-right: 4px solid transparent;
      &.selected {
        background-color: #ebebeb;
        border-radius: 30px 0 0 30px;
      }
      &:hover {
        //background-color: #313131;
        //color: white;
        border-right: 4px solid #313131;
        border-radius: 30px 0 0 30px;
      }
      a {
        display: flex;
        justify-content: space-between;
        width: 100%;
        color: white;
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        &:visited {
          cursor: pointer;
          text-decoration: none;
        }
        &.selected {
          color: #313131;
        }
        .link-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          .nav-icon {
            color: #313131;
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
      
      h4 {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: 200;
        border-radius: 50%;
        background: #011e44;
        color: white;
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    position: static;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    height: auto;
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    position: static;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    height: auto;
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

export default Nav;
