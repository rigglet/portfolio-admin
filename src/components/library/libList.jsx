import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import LibItem from "./libItem";

function LibList({
  libs,
  setViewEditLib,
  setViewViewLib,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
}) {
  return (
    <StyledLibList>
      {libs.length > 0 ? (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="short-header">Version</h4>
            <h4 className="long-header">Description</h4>
            <h4 className="short-header">Actions</h4>
          </li>
          {libs
            .sort((a, b) => (a.libName > b.libName ? 1 : -1))
            .map((lib) => {
              return (
                <LibItem
                  key={uuidv4()}
                  lib={lib}
                  declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditLib={setViewEditLib}
                  setViewViewLib={setViewViewLib}
                  handleViewEditRecord={handleViewEditRecord}
                />
              );
            })}
        </ul>
      ) : (
        ""
      )}
    </StyledLibList>
  );
}

const StyledLibList = styled(motion.div)`
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
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
`;

export default LibList;
