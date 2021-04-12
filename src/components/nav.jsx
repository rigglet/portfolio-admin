import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HiChevronRight, HiChevronDown, HiCode, HiLink } from "react-icons/hi";
import { MdWeb } from "react-icons/md";
import { motion } from "framer-motion";
import { getData } from "../api/api";
//UUID inique ID generator
//import { v4 as uuidv4 } from "uuid";

function Nav({ auth }) {
  const [chevron, setChevron] = useState(true);
  const [projects, setProjects] = useState({});
  const [links, setLinks] = useState({});
  const [technologies, setTechnologies] = useState({});

  async function fetchdata(type) {
    console.log(auth);
    const res = await getData(auth, type);
    if (res.status === 200) {
      //console.log(res);
      return res.data;
    }
  }

  useEffect(
    () => {
      async function getData() {
        setProjects(await fetchdata("projects"));
        setLinks(await fetchdata("links"));
        setTechnologies(await fetchdata("technologies"));
      }
      getData();
    },
    //eslint-disable-next-line
    []
  );

  //framer motion
  const container = {
    open: { opacity: 1, transition: { duration: 0.3, staggerChildren: 0.5 } },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };
  const item = {
    open: { opacity: 1, transition: { duration: 0.3 } },
    closed: {
      opacity: 0,
      transition: { duration: 0.3 },
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
            {projects.length ? <h4>{projects.length}</h4> : ""}
          </div>
        </motion.li>
        <motion.li variants={item}>
          <div className="link-info">
            <HiLink className="nav-icon" />
            <Link to="/admin/links">Links</Link>
          </div>
          <div className="link-amount">
            {links.length ? <h4>{links.length}</h4> : ""}
          </div>
        </motion.li>
        <motion.li variants={item}>
          <div className="link-info">
            <HiCode className="nav-icon" />
            <Link to="/admin/tech">Technologies</Link>
          </div>
          <div className="link-amount">
            {technologies.length ? <h4>{technologies.length}</h4> : ""}
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
  height: 100vh;
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
        font-size: 1rem;
        font-weight: 200;
        padding: 0.25rem;
        border-radius: 10px;
        background: #011e44;
        color: white;
      }
    }
  }
`;

export default Nav;
