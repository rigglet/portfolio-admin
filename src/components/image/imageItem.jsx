import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";

function ImageItem({
  image,
  setViewEditImage,
  setViewViewImage,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
}) {
  const [viewDelete, setViewDelete] = useState(false);

  return (
    <StyledImageItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={image._id}
            referringType="PROJECT"
          />
        )
      }

      <div className="data-item name-cell upper">{image.name || "profile"}</div>
      <div className="data-item short-cell">{image.description}</div>
      <div className="data-item long-cell">{image.fileName}</div>
      <div className="data-item short-cell">{image.category}</div>

      <div className="data-item actions-cell">
        <div className="action-bar">
          <FaRegFolderOpen
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(image);
              setViewViewImage(true);
            }}
          />
          {image.category !== "profile" && (
            <>
              <FaEdit
                className="action-icon"
                onClick={() => {
                  handleViewEditRecord(image);
                  setViewEditImage(true);
                }}
              />
              <FaTrash
                className="action-icon"
                onClick={() => setViewDelete(true)}
              />
            </>
          )}
        </div>
      </div>
    </StyledImageItem>
  );
}

const StyledImageItem = styled(motion.li)`
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

export default ImageItem;
