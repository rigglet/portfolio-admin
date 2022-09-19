import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen, FaCopy } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
//components
import DeleteConfirmation from "../DeleteConfirmation";
import Spinner from "../spinner";

function ProjectItem({
  project,
  setViewEditProject,
  setViewViewProject,
  handleViewEditRecord,
  handleDuplicateRecord,
  declineFnc,
  acceptFnc,
  toggleFeatured,
  toggleIncluded,
  deletingData,
  clickedItem,
}) {
  const [viewDelete, setViewDelete] = useState(false);
  return (
    <StyledProjectItem>
      {
        //view deleteConfirmation
        viewDelete && (
          <DeleteConfirmation
            declineFnc={declineFnc}
            acceptFnc={acceptFnc}
            setViewDelete={setViewDelete}
            id={project._id}
          />
        )
      }
      <div className="data-item name-cell upper">{project.projectName}</div>
      <div className="data-item long-cell">{project.projectDescription}</div>
      <div className="data-item short-cell">
        {project.featured ? (
          <TiTick
            className="icon tick"
            onClick={() => toggleFeatured(project)}
          />
        ) : (
          <TiTimes
            className="icon cross"
            onClick={() => toggleFeatured(project)}
          />
        )}
      </div>

      <div className="data-item short-cell">
        {project.included ? (
          <TiTick
            className="icon tick"
            onClick={() => toggleIncluded(project)}
          />
        ) : (
          <TiTimes
            className="icon cross"
            onClick={() => toggleIncluded(project)}
          />
        )}
      </div>

      <div className="data-item actions-cell">
        <div className="action-bar">
          <FaRegFolderOpen
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(project);
              setViewViewProject(true);
            }}
          />
          <FaEdit
            className="action-icon"
            onClick={() => {
              handleViewEditRecord(project);
              setViewEditProject(true);
            }}
          />
          <FaCopy
            className="action-icon"
            onClick={() => {
              handleDuplicateRecord(project);
            }}
          />
          {deletingData && project._id === clickedItem ? (
            <Spinner size="20px" alignment="flex-end" />
          ) : (
            <FaTrash
              className="action-icon"
              onClick={() => setViewDelete(true)}
            />
          )}
        </div>
      </div>
    </StyledProjectItem>
  );
}

const StyledProjectItem = styled(motion.li)`
  display: flex;
  border-bottom: 1px solid #688297;
  gap: 0.25rem;
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
    flex: 0 0 25%;
  }
  .actions-cell {
    border: 1px solid red;
    display: flex;
    flex: 0 0 150px;
    justify-content: center;
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
  .icon {
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;
    color: #888888;
  }
  .tick {
    color: green;
  }
  .cross {
    color: red;
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

export default ProjectItem;
