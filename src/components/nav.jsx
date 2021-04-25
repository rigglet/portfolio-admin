import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiChevronRight, HiChevronDown, HiCode, HiLink } from "react-icons/hi";
import { MdWeb } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { motion } from "framer-motion";

function Nav({ projectNo, linkNo, techNo, libNo, packageNo }) {
  const [chevron, setChevron] = useState(true);

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
        <h3>Navigation</h3>
        {chevron ? (
          <HiChevronDown
            onClick={() => setChevron(!chevron)}
            className="nav-chev"
          />
        ) : (
          <HiChevronRight
            onClick={() => setChevron(!chevron)}
            className="nav-chev"
          />
        )}
      </div>
      <motion.ul animate={chevron ? "open" : "closed"} variants={container}>
        <motion.li variants={item}>
          <div className="link-info">
            <MdWeb className="nav-icon" />
            <Link to="/admin/projects">Projects</Link>
          </div>
          <div className="link-amount">
            <h4>{projectNo}</h4>
          </div>
        </motion.li>
        <motion.li variants={item}>
          <div className="link-info">
            <HiLink className="nav-icon" />
            <Link to="/admin/links">Links</Link>
          </div>
          <div className="link-amount">
            <h4>{linkNo}</h4>
          </div>
        </motion.li>
        <motion.li variants={item}>
          <div className="link-info">
            <HiCode className="nav-icon" />
            <Link to="/admin/tech">Technologies</Link>
          </div>
          <div className="link-amount">
            <h4>{techNo}</h4>
          </div>
        </motion.li>
        <motion.li variants={item}>
          <div className="link-info">
            <IoLibraryOutline className="nav-icon" />
            <Link to="/admin/libraries">Libraries</Link>
          </div>
          <div className="link-amount">
            <h4>{libNo}</h4>
          </div>
        </motion.li>
        <motion.li variants={item}>
          <div className="link-info">
            <GoPackage className="nav-icon" />
            <Link to="/admin/packages">Packages</Link>
          </div>
          <div className="link-amount">
            <h4>{packageNo}</h4>
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
  padding: 0.25rem;

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
      padding: 1rem;
      cursor: pointer;
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
