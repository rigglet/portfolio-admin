import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import TechItem from "./techItem";

function TechList({
  techs,
  setViewEditTech,
  setViewViewTech,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
}) {
  return (
    <StyledTechList>
      {techs.length > 0 ? (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="short-header">Type</h4>
            <h4 className="long-header">Address</h4>
            <h4 className="actions-header">Actions</h4>
          </li>
          {techs
            .sort((a, b) => (a.techName > b.techName ? 1 : -1))
            .map((tech) => {
              return (
                <TechItem
                  key={uuidv4()}
                  tech={tech}
                  declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditTech={setViewEditTech}
                  setViewViewTech={setViewViewTech}
                  handleViewEditRecord={handleViewEditRecord}
                />
              );
            })}
        </ul>
      ) : (
        ""
      )}
    </StyledTechList>
  );
}

const StyledTechList = styled(motion.div)`
  display: flex;
  flex-direction: column;

  ul {
    width: 83vw;
    list-style: none;
  }

  .headers {
    display: flex;
    gap: 0.25rem;

    h4 {
      background-color: #688297;
      padding: 0.25rem 0.5rem;
      font-weight: 500;
      color: white;
      text-align: left;
      display: flex;
      align-items: center;
    }
  }
  .name-header {
    flex: 0 0 20%;
  }
  .short-header {
    flex: 0 0 15%;
    //justify-content: center;
    text-align: left;
  }
  .actions-header {
    flex: 0 0 15%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
`;

export default TechList;
