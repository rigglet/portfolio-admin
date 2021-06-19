import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";
import Spinner from "../spinner";

function ToolItem({
  tool,
  setViewEditTool,
  setViewViewTool,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
  deletingData,
  clickedItem,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledToolItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={tool._id}
            referringType="SITE"
          />
        )
      }

      <div className="data-item name-cell upper">{tool.name}</div>
      <div className="data-item short-cell">{tool.category}</div>
      <div className="data-item short-cell">{tool.type}</div>
      <div className="data-item long-cell">{tool.address}</div>

      <div className="data-item actions-cell">
        <div className="action-bar">
          <FaRegFolderOpen
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(tool);
              setViewViewTool(true);
            }}
          />
          <FaEdit
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(tool);
              setViewEditTool(true);
            }}
          />
          {deletingData && tool._id === clickedItem ? (
            <Spinner size="20px" alignment="flex-end" />
          ) : (
            <FaTrash
              className="action-icon"
              onClick={() => setViewDelete(true)}
            />
          )}
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
  font-family: "Poppins", sans-serif;

  &:visited {
    text-decoration: none;
  }

  .data-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 11pt;
    font-weight: 400;
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
`;

export default ToolItem;
