import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import ProjectItem from "./projectItem";

function ProjectList({
  projects,
  handleEditRecord,
  handleDeleteRecord,
  handleViewRecord,
  updateProject,
}) {
  const toggleIncluded = (project) => {
    const newProject = {
      ...project,
      included: !project.included,
    };

    //update project
    updateProject(newProject);
  };

  const toggleFeatured = (project) => {
    const newProject = {
      ...project,
      featured: !project.featured,
    };

    //update project
    updateProject(newProject);
  };

  return (
    <StyledProjectList>
      {projects.length > 0 ? (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="long-header">Description</h4>
            <h4 className="short-header">Featured?</h4>
            <h4 className="short-header">Included?</h4>
            <h4 className="short-header">Actions</h4>
          </li>
          {projects
            .sort((a, b) => (a.projectName > b.projectName ? 1 : -1))
            .map((project) => {
              return (
                <ProjectItem
                  key={uuidv4()}
                  project={project}
                  handleDeleteRecord={handleDeleteRecord}
                  handleEditRecord={handleEditRecord}
                  handleViewRecord={handleViewRecord}
                  updateProject={updateProject}
                  toggleFeatured={toggleFeatured}
                  toggleIncluded={toggleIncluded}
                />
              );
            })}
        </ul>
      ) : (
        ""
      )}
    </StyledProjectList>
  );
}

const StyledProjectList = styled(motion.div)`
  display: flex;
  flex-direction: column;

  ul {
    width: 83vw;
    list-style: none;
  }

  .headers {
    display: flex;
    gap: 0.25rem;
    h4 {
      background-color: #688297;
      padding: 0.25rem 0.5rem;
      font-weight: 500;
      color: white;
      text-align: left;
      display: flex;
      align-items: center;
    }
  }
  .name-header {
    flex: 0 0 20%;
  }
  .short-header {
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
  }
`;

export default ProjectList;
