import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaTrash, FaEdit, FaRegFolderOpen } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";

function ProjectItem({
  project,
  handleDeleteRecord,
  handleEditRecord,
  handleViewRecord,
  toggleFeatured,
  toggleIncluded,
}) {
  return (
    <StyledProjectItem>
      <div className="data-item name-cell">{project.projectName}</div>
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

      <div className="data-item short-cell">
        <div className="toolbar">
          <FaRegFolderOpen
            id="view"
            className="icon"
            onClick={() => handleViewRecord(project._id)}
          />
          <FaEdit
            className="icon"
            onClick={() => handleEditRecord(project._id)}
          />
          <FaTrash
            className="icon"
            onClick={() => handleDeleteRecord(project._id)}
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
    align-items: center;
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-cell {
    flex-grow: 1;
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

export default ProjectItem;
