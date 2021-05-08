import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import ToolItem from "./toolItem";

function ToolList({
  tools,
  setViewEditTool,
  setViewViewTool,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
}) {
  return (
    <StyledToolList>
      {tools.length > 0 ? (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="short-header">Type</h4>
            <h4 className="long-header">Address</h4>
            <h4 className="actions-header">Actions</h4>
          </li>
          {tools
            .sort((a, b) => (a.toolName > b.toolName ? 1 : -1))
            .map((tool) => {
              return (
                <ToolItem
                  key={uuidv4()}
                  tool={tool}
                  declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditTool={setViewEditTool}
                  setViewViewTool={setViewViewTool}
                  handleViewEditRecord={handleViewEditRecord}
                />
              );
            })}
        </ul>
      ) : (
        ""
      )}
    </StyledToolList>
  );
}

const StyledToolList = styled(motion.div)`
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
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
`;

export default ToolList;
