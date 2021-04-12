import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

function Technologies({ auth }) {
  const [technologies, setTechnologies] = useState({});

  useEffect(
    () => {
      async function getTable() {
        const res = await getData(auth, "technologies");
        if (res.status === 200) {
          setTechnologies(res.data);
        }
      }
      getTable();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <StyledTechnologies>
      <h1>Technologies</h1>
      {technologies.length > 0 ? (
        <ul>
          {technologies.map((item) => {
            return <li key={uuidv4()}>{item.name}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
    </StyledTechnologies>
  );
}

const StyledTechnologies = styled(motion.div)`
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

export default Technologies;
