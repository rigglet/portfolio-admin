import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";

function TextItem({
  text,
  setViewEditText,
  setViewViewText,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledTextItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={text._id}
            referringType="SITE"
          />
        )
      }

      <div className="data-item name-cell upper">{text.name}</div>
      <div className="data-item long-cell">{text.content}</div>

      <div className="data-item short-cell">
        <div className="toolbar">
          <FaRegFolderOpen
            className="icon"
            onClick={() => {
              handleViewEditRecord(text);
              setViewViewText(true);
            }}
          />
          <FaEdit
            className="icon"
            onClick={() => {
              handleViewEditRecord(text);
              setViewEditText(true);
            }}
          />
          <FaTrash className="icon" onClick={() => setViewDelete(true)} />
        </div>
      </div>
    </StyledTextItem>
  );
}

const StyledTextItem = styled(motion.li)`
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

export default TextItem;
