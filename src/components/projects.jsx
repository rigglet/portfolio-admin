import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

function Projects({ auth }) {
  const [projects, setProjects] = useState({});

  useEffect(
    () => {
      async function getTable() {
        const res = await getData(auth, "projects");
        if (res.status === 200) {
          setProjects(res.data);
        }
      }
      getTable();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <StyledProjects>
      <h1>Projects</h1>
      {projects.length > 0 ? (
        <ul>
          {projects.map((item) => {
            return <li key={uuidv4()}>{item.projectName}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
    </StyledProjects>
  );
}

const StyledProjects = styled(motion.div)`
  position: relative;
  left: 15.5vw;
  top: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  ul {
    list-style: none;
    li {
      text-decoration: none;
      &:visited {
        text-decoration: none;
      }
    }
  }
`;

export default Projects;
