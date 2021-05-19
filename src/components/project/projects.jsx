import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//data
import { deleteData, postData, updateData } from "../../api/api";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//dates
import { DateTime } from "luxon";

//components
import ProjectList from "./projectList";
import ProjectAddEdit from "./projectAddEdit";
import ProjectView from "./projectView";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Projects({
  auth,
  projects,
  setProjects,
  images,
  setImages,
  techs,
  setTechs,
  packages,
  setPackages,
  libraries,
  setLibraries,
}) {
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    version: "",
    author: "",
    featured: false,
    included: false,
    website: "",
    githubLink: "",
    shortDescription: "",
    projectDescription: "",
    addedDate: DateTime.now(),
    startedDate: DateTime.now(),
    completedDate: DateTime.now(),
    libraries: [],
    packages: [],
    technologies: [],
    screenshots: [],
    //TODO: features: [],
    //TODO: highlights /proud of...
  });

  const [viewViewProject, setViewViewProject] = useState(false);
  const [viewAddProject, setViewAddProject] = useState(false);
  const [viewEditProject, setViewEditProject] = useState(false);

  const notify = (type) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Project EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Project ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Project DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE LIST EDIT
  const handleSaveList = async (project) => {
    const updateProject = async () => {
      return await updateData(auth, "projects", project);
    };

    updateProject()
      .then((result) => {
        //Toast message
        notify("EDITED", result.status, result._id);
        return result;
      })
      .then(() => {
        setProjects([
          ...projects.filter((p) => p._id !== project._id),
          project,
        ]);
      });
  };

  //HANDLE ADD PROJECT
  const handleSaveProject = async () => {
    const addProject = async () => {
      return await postData(auth, "projects", currentProject);
    };

    addProject()
      .then((result) => {
        //Toast message
        notify("ADDED", result.status, result.data._id);
        return result;
      })
      .then((result) => {
        setProjects([...projects, result.data]);
      })
      .then(() => {
        setViewAddProject(false);
        setCurrentProject({
          projectName: "",
          version: "",
          author: "",
          featured: false,
          included: false,
          website: "",
          githubLink: "",
          shortDescription: "",
          projectDescription: "",
          addedDate: DateTime.now(),
          startedDate: DateTime.now(),
          completedDate: DateTime.now(),
          libraries: [],
          packages: [],
          technologies: [],
          screenshots: [],
        });
      });
  };

  //HANDLE EDIT PROJECT
  const handleEditProject = async () => {
    const editProject = async () => {
      return await updateData(auth, "projects", currentProject);
    };

    editProject()
      .then((result) => {
        //Toast message
        notify("EDITED", result.status, result._id);
        return result;
      })
      .then(() => {
        setProjects([
          ...projects.filter((p) => p._id !== currentProject._id),
          currentProject,
        ]);
      })
      .then(() => {
        setViewEditProject(false);
        setCurrentProject({
          projectName: "",
          version: "",
          author: "",
          featured: false,
          included: false,
          website: "",
          githubLink: "",
          shortDescription: "",
          projectDescription: "",
          addedDate: DateTime.now(),
          startedDate: DateTime.now(),
          completedDate: DateTime.now(),
          libraries: [],
          packages: [],
          technologies: [],
          screenshots: [],
        });
      });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteProject = async () => {
      return await deleteData(auth, "projects", id);
    };

    deleteProject()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setProjects([...projects.filter((p) => p._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (project) => {
    setCurrentProject(project);
  };

  return (
    <StyledProjects>
      <ToastContainer
        closeButton={false}
        transition={Zoom}
        position="bottom-center"
        draggable={false}
        pauseOnHover
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />

      {
        //view ADD PROJECT modal
        viewAddProject && (
          <ProjectAddEdit
            openingHookSetter={setViewAddProject}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            handleSaveProject={handleSaveProject}
            title="Add new project"
            formType="NEW"
            images={images}
            setImages={setImages}
            techs={techs}
            setTechs={setTechs}
            packages={packages}
            setPackages={setPackages}
            libraries={libraries}
            setLibraries={setLibraries}
          />
        )
      }

      {
        //view EDIT PROJECT modal
        viewEditProject && (
          <ProjectAddEdit
            openingHookSetter={setViewEditProject}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            handleEditProject={handleEditProject}
            title="Edit project"
            formType="EDIT"
            images={images}
            setImages={setImages}
            techs={techs}
            setTechs={setTechs}
            packages={packages}
            setPackages={setPackages}
            libraries={libraries}
            setLibraries={setLibraries}
          />
        )
      }
      {
        //view VIEW PROJECT modal
        viewViewProject && (
          <ProjectView
            openingHookSetter={setViewViewProject}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            title="View project"
            formType="VIEW"
          />
        )
      }

      <div className="header">
        <h1>Projects</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
            onClick={() => setViewAddProject(true)}
          />
        </div>
      </div>

      {projects.length > 0 ? (
        <ProjectList
          projects={projects}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          handleSaveList={handleSaveList}
          setViewEditProject={setViewEditProject}
          setViewViewProject={setViewViewProject}
        />
      ) : (
        <h4 className="empty">No projects to display</h4>
      )}
    </StyledProjects>
  );
}

const StyledProjects = styled(motion.div)`
  position: relative;
  left: 15.5vw;
  top: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  //empty table msg
  .empty {
    margin-top: 2rem;
  }
  //top header
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
    margin-bottom: 0.5rem;
    .toolbar {
      display: flex;
      gap: 0.5rem;
      .h-icon {
        cursor: pointer;
        width: 1.4rem;
        height: 1.4rem;
      }
    }
    h1 {
      font-size: 16pt;
      font-weight: 600;
    }
  }
`;

export default Projects;
