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
  handleDuplicateRecord,
  handleSaveList,
  deletingData,
  clickedItem,
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
        <>
        <ul className="table-header">
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="long-header">Description</h4>
            <h4 className="short-header">Featured?</h4>
            <h4 className="short-header">Included?</h4>
            <h4 className="actions-header">Actions</h4>
          </li>
          </ul>
          <ul className="table-data">
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
                  handleDuplicateRecord={handleDuplicateRecord}
                  deletingData={deletingData}
                  clickedItem={clickedItem}
                  />
                  );
                })}
        </ul>
        </>
      )}
    </StyledProjectList>
  );
}

const StyledProjectList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 80vh;
  row-gap: 0.5rem;
  
  .table-header{
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
    .actions-header {
      flex: 0 0 165px;
      justify-content: center;
    }
    .short-header {
      flex: 0 0 10%;
      justify-content: center;
      text-align: left;
    }
    .long-header {
      flex-grow: 1;
      text-align: left;
    }
  }

  .table-data{
    height: 100%;
    width: auto;
    list-style: none;
    overflow-y: scroll;
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    border: 1px solid red;
    h4 {
      padding: 0.15rem 0.25rem;
    }
    .name-header {
      flex: 0 0 50%;
    }
    .actions-header {
      flex: 0 0 50%;
      justify-content: center;
    }
    .short-header {
      display: none !important;
    }
    .long-header {
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

export default ProjectList;
