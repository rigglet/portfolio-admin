import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";

function LinkItem({
  link,
  setViewEditLink,
  setViewViewLink,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledLinkItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={link._id}
            referringType="SITE"
          />
        )
      }

      <div className="data-item name-cell upper">{link.name}</div>
      <div className="data-item short-cell">{link.type}</div>
      <div className="data-item long-cell">{link.address}</div>

      <div className="data-item short-cell">
        <div className="action-bar">
          <FaRegFolderOpen
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(link);
              setViewViewLink(true);
            }}
          />
          <FaEdit
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(link);
              setViewEditLink(true);
            }}
          />
          <FaTrash
            className="action-icon"
            onClick={() => setViewDelete(true)}
          />
        </div>
      </div>
    </StyledLinkItem>
  );
}

const StyledLinkItem = styled(motion.li)`
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
    //align-items: center;
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-cell {
    flex-grow: 1;
    //text-align: left;
    justify-content: center;
  }
`;

export default LinkItem;
