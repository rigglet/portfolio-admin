import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";

function LibItem({
  lib,
  setViewEditLib,
  setViewViewLib,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledLibItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={lib._id}
            referringType="PROJECT"
          />
        )
      }

      <div className="data-item name-cell upper">{lib.name}</div>
      <div className="data-item short-cell">{lib.version}</div>
      <div className="data-item long-cell">{lib.description}</div>

      <div className="data-item short-cell">
        <div className="action-bar">
          <FaRegFolderOpen
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(lib);
              setViewViewLib(true);
            }}
          />
          <FaEdit
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(lib);
              setViewEditLib(true);
            }}
          />
          <FaTrash
            className="action-icon"
            onClick={() => setViewDelete(true)}
          />
        </div>
      </div>
    </StyledLibItem>
  );
}

const StyledLibItem = styled(motion.li)`
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
  .short-cell {
    display: flex;
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-cell {
    flex-grow: 1;
    justify-content: center;
  }
`;

export default LibItem;
