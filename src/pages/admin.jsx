import React, { useState, useEffect } from "react";
import Nav from "../components/nav";
import Bar from "../components/bar";
import styled from "styled-components";
//import { FaUser, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
//import profile from "../images/profile.svg";
//auth
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

function Admin({ auth }) {
  const [projects, setProjects] = useState({});
  const [links, setLinks] = useState({});
  const [technologies, setTechnologies] = useState({});

  async function fetchdata(type) {
    const res = await getData(auth, type);
    if (res.status === 200) {
      //console.log(res);
      return res.data;
    }
  }

  useEffect(() => {
    async function getData() {
      setProjects(await fetchdata("projects"));
      setLinks(await fetchdata("links"));
      setTechnologies(await fetchdata("technologies"));
    }
    getData();
  }, []);

  return (
    <StyledAdmin>
      <Bar />
      <Nav />
      {projects.length > 0 ? (
        <ul>
          {projects.map((item) => {
            return <li key={uuidv4()}>{item.projectName}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
      {links.length > 0 ? (
        <ul>
          {links.map((item) => {
            return <li key={uuidv4()}>{item.name}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
      {technologies.length > 0 ? (
        <ul>
          {technologies.map((item) => {
            return <li key={uuidv4()}>{item.name}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
    </StyledAdmin>
  );
}

const StyledAdmin = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export default Admin;
