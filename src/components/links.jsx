import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";

function Links({ auth }) {
  const [links, setLinks] = useState([]);

  useEffect(
    () => {
      async function getTable() {
        return await getData(auth, "links");
      }
      getTable().then((result) => {
        if (result.status === 200) {
          setLinks(result.data);
          console.log(result.data);
        }
      });
    },
    // eslint-disable-next-line
    []
  );

  //TODO: Just use a list of divs
  return (
    <StyledLinks>
      <h1>Links</h1>
      {links.length > 0 ? (
        <ul>
          {links.map((item) => {
            return <li key={uuidv4()}>{item.name}</li>;
          })}
        </ul>
      ) : (
        ""
      )}
    </StyledLinks>
  );
}

const StyledLinks = styled(motion.div)`
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

export default Links;
