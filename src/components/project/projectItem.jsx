import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
//components
import DeleteConfirmation from "../DeleteConfirmation";

function ProjectItem({
  project,
  setViewEditProject,
  setViewViewProject,
  handleViewEditRecord,
  declineFnc,
  acceptFnc,
  toggleFeatured,
  toggleIncluded,
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
          <FaTrash
            className="action-icon"
            onClick={() => setViewDelete(true)}
          />
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
    display: flex;
    flex: 0 0 10%;
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
`;

export default ProjectItem;
