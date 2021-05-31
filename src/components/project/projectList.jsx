import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import ProjectItem from "./projectItem";

function ProjectList({
  projects,
  setViewEditProject,
  setViewViewProject,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
  handleSaveList,
}) {
  const toggleIncluded = (project) => {
    const newProject = {
      ...project,
      included: !project.included,
    };

    //update project
    handleSaveList(newProject);
  };

  const toggleFeatured = (project) => {
    const newProject = {
      ...project,
      featured: !project.featured,
    };

    //update project
    handleSaveList(newProject);
  };

  return (
    <StyledProjectList>
      {projects.length > 0 && (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="long-header">Description</h4>
            <h4 className="short-header">Featured?</h4>
            <h4 className="short-header">Included?</h4>
            <h4 className="actions-header">Actions</h4>
          </li>
          {projects
            .sort((a, b) => (a.projectName > b.projectName ? 1 : -1))
            .map((project) => {
              return (
                <ProjectItem
                  key={uuidv4()}
                  toggleFeatured={toggleFeatured}
                  toggleIncluded={toggleIncluded}
                  project={project}
                  declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditProject={setViewEditProject}
                  setViewViewProject={setViewViewProject}
                  handleViewEditRecord={handleViewEditRecord}
                />
              );
            })}
        </ul>
      )}
    </StyledProjectList>
  );
}

const StyledProjectList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ul {
    width: auto;
    height: 80vh;
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
      cursor: default;
    }
  }
  .name-header {
    flex: 0 0 25%;
  }
  .short-header {
    flex: 0 0 10%;
    justify-content: center;
    text-align: left;
  }
  .actions-header {
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
`;

export default ProjectList;
