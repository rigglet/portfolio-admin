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
  techs,
  packages,
  libraries,
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
    mainImage: null,
    features: [],
    highlights: [],
  });

  const [viewViewProject, setViewViewProject] = useState(false);
  const [viewAddProject, setViewAddProject] = useState(false);
  const [viewEditProject, setViewEditProject] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
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
      case "EDIT_ERROR":
        toast.dark(`Error EDITING project: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING project: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING project: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE LIST EDIT
  const handleSaveList = async (project) => {
    setFetchingData(true);

    const updateProject = async () => {
      return await updateData(auth, "projects", project);
    };

    updateProject()
      .then((result) => {
        if (result.status === 200) {
          setProjects([
            ...projects.filter((p) => p._id !== project._id),
            project,
          ]);
          //Toast message
          notify("EDITED");
        }
      })
      .catch((err) => {
        notify("EDIT_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE ADD PROJECT
  const handleSaveProject = async () => {
    setFetchingData(true);

    const addProject = async () => {
      return await postData(auth, "projects", currentProject);
    };

    addProject()
      .then((result) => {
        if (result.status === 200) {
          setProjects([...projects, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
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
          mainImage: null,
          features: [],
          highlights: [],
        });
        setViewAddProject(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE EDIT PROJECT
  const handleEditProject = async () => {
    setFetchingData(true);

    const editProject = async () => {
      return await updateData(auth, "projects", currentProject);
    };

    editProject()
      .then((result) => {
        if (result.status === 200) {
          setProjects([
            ...projects.filter((p) => p._id !== currentProject._id),
            currentProject,
          ]);
          //Toast message
          notify("EDITED");
        }
      })
      .then(() => {
        setFetchingData(false);
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
        setViewEditProject(false);
      })
      .catch((err) => {
        notify("EDIT_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    setDeletingData(true);
    setClickedItem(id);

    const deleteProject = async () => {
      return await deleteData(auth, "projects", id);
    };

    deleteProject()
      .then((result) => {
        if (result.status === 200) {
          setProjects([...projects.filter((p) => p._id !== id)]);
        }
      })
      .then(() => {
        setDeletingData(false);
        //Toast message
        notify("DELETED");
      })
      .catch((err) => {
        notify("DELETE_ERROR", err);
        setDeletingData(false);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (project) => {
    setCurrentProject({ ...currentProject, ...project });
  };

  return (
    <StyledProjects>
      <ToastContainer
        closeButton={false}
        transition={Zoom}
        position="bottom-center"
        draggable={false}
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
            fetchingData={fetchingData}
            title="Add new project"
            formType="ADD"
            images={images}
            techs={techs}
            packages={packages}
            libraries={libraries}
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
            fetchingData={fetchingData}
            title="Edit project"
            formType="EDIT"
            images={images}
            techs={techs}
            packages={packages}
            libraries={libraries}
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
            className="header-icon"
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
          deletingData={deletingData}
          clickedItem={clickedItem}
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
`;

export default Projects;
