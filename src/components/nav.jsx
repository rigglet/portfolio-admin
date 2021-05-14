import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//react router
import { Link, useLocation } from "react-router-dom";
//icons
import { ImImages } from "react-icons/im";
import { FaTools, FaMapSigns } from "react-icons/fa";
import { HiChevronRight, HiChevronDown, HiCode, HiLink } from "react-icons/hi";
import { MdWeb } from "react-icons/md";
import { IoLibraryOutline, IoText } from "react-icons/io5";
import { GoPackage } from "react-icons/go";

function Nav({
  projectNo,
  linkNo,
  techNo,
  libNo,
  packageNo,
  imageNo,
  toolNo,
  roadmapNo,
  copyNo,
}) {
  const [projectChevron, setProjectChevron] = useState(true);
  const [siteChevron, setSiteChevron] = useState(true);
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
          <HiChevronDown
            onClick={() => setProjectChevron(!projectChevron)}
            className="nav-chev"
          />
        ) : (
          <HiChevronRight
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
          <div className="link-info">
            <MdWeb className="nav-icon" />
            <Link
              to="/admin/projects"
              className={path === "projects" ? "selected" : ""}
            >
              Projects
            </Link>
          </div>
          <div className="link-amount">
            <h4>{projectNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "tech" ? "selected" : ""}
        >
          <div className="link-info">
            <HiCode className="nav-icon" />
            <Link
              className={path === "tech" ? "selected" : ""}
              to="/admin/tech"
            >
              Technologies
            </Link>
          </div>
          <div className="link-amount">
            <h4>{techNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "libraries" ? "selected" : ""}
        >
          <div className="link-info">
            <IoLibraryOutline className="nav-icon" />
            <Link
              className={path === "libraries" ? "selected" : ""}
              to="/admin/libraries"
            >
              Libraries
            </Link>
          </div>
          <div className="link-amount">
            <h4>{libNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "packages" ? "selected" : ""}
        >
          <div className="link-info">
            <GoPackage className="nav-icon" />
            <Link
              className={path === "packages" ? "selected" : ""}
              to="/admin/packages"
            >
              Packages
            </Link>
          </div>
          <div className="link-amount">
            <h4>{packageNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "images" ? "selected" : ""}
        >
          <div className="link-info">
            <ImImages className="nav-icon" />
            <Link
              className={path === "images" ? "selected" : ""}
              to="/admin/images"
            >
              Images
            </Link>
          </div>
          <div className="link-amount">
            <h4>{imageNo}</h4>
          </div>
        </motion.li>
      </motion.ul>
      <div className="nav-heading">
        <h3>Site</h3>
        {siteChevron ? (
          <HiChevronDown
            onClick={() => setSiteChevron(!siteChevron)}
            className="nav-chev"
          />
        ) : (
          <HiChevronRight
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
          <div className="link-info">
            <FaTools className="nav-icon" />
            <Link
              className={path === "tools" ? "selected" : ""}
              to="/admin/tools"
            >
              Tools
            </Link>
          </div>
          <div className="link-amount">
            <h4>{toolNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "links" ? "selected" : ""}
        >
          <div className="link-info">
            <HiLink className="nav-icon" />
            <Link
              className={path === "links" ? "selected" : ""}
              to="/admin/links"
            >
              Links
            </Link>
          </div>
          <div className="link-amount">
            <h4>{linkNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "roadmap" ? "selected" : ""}
        >
          <div className="link-info">
            <FaMapSigns className="nav-icon" />
            <Link
              className={path === "roadmap" ? "selected" : ""}
              to="/admin/roadmap"
            >
              Roadmap
            </Link>
          </div>
          <div className="link-amount">
            <h4>{roadmapNo}</h4>
          </div>
        </motion.li>
        <motion.li
          variants={item}
          className={path === "copy" ? "selected" : ""}
        >
          <div className="link-info">
            <IoText className="nav-icon" />
            <Link
              className={path === "roadmap" ? "selected" : ""}
              to="/admin/copy"
            >
              Copy
            </Link>
          </div>
          <div className="link-amount">
            <h4>{copyNo}</h4>
          </div>
        </motion.li>
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
      &.selected {
        background-color: #ebebeb;
        border-radius: 30px 0 0 30px;
      }
      .link-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .nav-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
        a {
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
`;

export default Nav;
