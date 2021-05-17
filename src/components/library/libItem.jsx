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
        viewDelete ? (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={lib._id}
            referringType="PROJECT"
          />
        ) : (
          ""
        )
      }

      <div className="data-item name-cell">{lib.name}</div>
      <div className="data-item short-cell">{lib.version}</div>
      <div className="data-item long-cell">{lib.description}</div>

      <div className="data-item short-cell">
        <div className="toolbar">
          <FaRegFolderOpen
            className="icon"
            onClick={() => {
              handleViewEditRecord(lib);
              setViewViewLib(true);
            }}
          />
          <FaEdit
            className="icon"
            onClick={() => {
              handleViewEditRecord(lib);
              setViewEditLib(true);
            }}
          />
          <FaTrash className="icon" onClick={() => setViewDelete(true)} />
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
  .short-cell {
    display: flex;
    //align-items: center;
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-cell {
    flex-grow: 1;
    //text-align: left;
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
  .tick {
    color: green;
    //cursor: default;
  }
  .cross {
    color: red;
    //cursor: default;
  }
`;

export default LibItem;
