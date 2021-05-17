import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";

function ToolItem({
  tool,
  setViewEditTool,
  setViewViewTool,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledToolItem>
      {
        //view deleteConfirmation
        viewDelete ? (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={tool._id}
            referringType="SITE"
          />
        ) : (
          ""
        )
      }

      <div className="data-item name-cell">{tool.name}</div>
      <div className="data-item short-cell">{tool.category}</div>
      <div className="data-item short-cell">{tool.type}</div>
      <div className="data-item long-cell">{tool.address}</div>

      <div className="data-item actions-cell">
        <div className="toolbar">
          <FaRegFolderOpen
            className="icon"
            onClick={() => {
              handleViewEditRecord(tool);
              setViewViewTool(true);
            }}
          />
          <FaEdit
            className="icon"
            onClick={() => {
              handleViewEditRecord(tool);
              setViewEditTool(true);
            }}
          />
          <FaTrash className="icon" onClick={() => setViewDelete(true)} />
        </div>
      </div>
    </StyledToolItem>
  );
}

const StyledToolItem = styled(motion.li)`
  display: flex;
  border-bottom: 1px solid #688297;
  gap: 0.25rem;
  position: relative;
  align-items: center;
  text-decoration: none;

  &:visited {
    text-decoration: none;
  }

  .data-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 11pt;
    font-weight: 500;
    padding: 0.5rem;
  }

  .name-cell {
    flex: 0 0 20%;
  }
  .actions-cell {
    display: flex;
    flex: 0 0 10%;
    justify-content: center;
  }
  .short-cell {
    display: flex;
    flex: 0 0 15%;
  }
  .long-cell {
    flex-grow: 1;
    justify-content: center;
  }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .icon {
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;
    color: #888888;
  }
`;

export default ToolItem;
