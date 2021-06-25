import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import DeleteConfirmation from "../DeleteConfirmation";
import Spinner from "../spinner";

function ImageItem({
  image,
  setViewEditImage,
  setViewViewImage,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
  deletingData,
  clickedItem,
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
              {deletingData && image._id === clickedItem ? (
                <Spinner size="20px" />
              ) : (
                <FaTrash
                  className="action-icon"
                  onClick={() => setViewDelete(true)}
                />
              )}
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

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    .name-cell {
      flex: 0 0 50%;
    }
    .actions-cell {
      flex: 0 0 50%;
      justify-content: center;
    }
    .short-cell {
      display: none !important;
    }
    .long-cell {
      display: none !important;
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
  }

  //481px — 768px: iPads, Tablets
  @media screen and (min-width: 481px) and (max-width: 769px) and (orientation: portrait) {
  }

  //481px — 768px: iPads, Tablets
  //@media screen and (min-width: 481px) and (max-width: 769px) and (orientation: landscape) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {}

  //1025px — 1200px: Desktops, large screens
  @media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {
  }

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  @media screen and (min-width: 1921px) and (orientation: landscape) {
  }
`;

export default ImageItem;
