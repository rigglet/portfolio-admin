import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";
import Spinner from "../spinner";

function PackageItem({
  pack,
  setViewEditPackage,
  setViewViewPackage,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
  deletingData,
  clickedItem,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledPackageItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={pack._id}
            referringType="PROJECT"
          />
        )
      }

      <div className="data-item name-cell upper">{pack.name}</div>
      <div className="data-item short-cell">{pack.version}</div>
      <div className="data-item long-cell">{pack.description}</div>

      <div className="data-item short-cell">
        <div className="action-bar">
          <FaRegFolderOpen
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(pack);
              setViewViewPackage(true);
            }}
          />
          <FaEdit
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(pack);
              setViewEditPackage(true);
            }}
          />
          {deletingData && pack._id === clickedItem ? (
            <Spinner size="20px" />
          ) : (
            <FaTrash
              className="action-icon"
              onClick={() => setViewDelete(true)}
            />
          )}
        </div>
      </div>
    </StyledPackageItem>
  );
}

const StyledPackageItem = styled(motion.li)`
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

export default PackageItem;
