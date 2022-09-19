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
  allIcons,
}) {
  const [currentProject, setCurrentProject] = useState({
    projectName: "",
    version: "",
    author: "",
    featured: false,
    included: false,
    website: "",
    githubLink: "",
    walkthroughVideo: "",
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
      case "DUPLICATED":
        toast.dark(`Project DUPLICATED successfully`);
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
    setFetchingData(() => true);

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
      .then(() => {
        setFetchingData(() => false);
      })
      .catch((err) => {
        notify("EDIT_ERROR", err);
        setFetchingData(() => false);
      });
  };

  //HANDLE ADD PROJECT
  const handleSaveProject = async () => {
    setFetchingData(() => true);

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
        setFetchingData(() => false);

        setCurrentProject({
          projectName: "",
          version: "",
          author: "",
          featured: false,
          included: false,
          website: "",
          githubLink: "",
          walkthroughVideo: "",
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
        setFetchingData(() => false);
      });
  };

  //HANDLE EDIT PROJECT
  const handleEditProject = async () => {
    setFetchingData(() => true);

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
        setFetchingData(() => false);
        setCurrentProject({
          projectName: "",
          version: "",
          author: "",
          featured: false,
          included: false,
          website: "",
          githubLink: "",
          walkthroughVideo: "",
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
        setFetchingData(() => false);
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

  //HANDLE DUPLICATE RECORD
  const handleDuplicateRecord = async (project) => {
    setFetchingData(() => true);

    //console.log(project);
    const addProject = async () => {
      return await postData(auth, "projects", project);
    };

    addProject()
      .then((result) => {
        if (result.status === 200) {
          setProjects([...projects, result.data]);
          //Toast message
          notify("DUPLICATED");
        }
      })
      .then(() => {
        setFetchingData(() => false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(() => false);
      });
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
            allIcons={allIcons}
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
            allIcons={allIcons}
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
        <>
          <ProjectList
            projects={projects}
            acceptFnc={handleDeleteRecord}
            handleViewEditRecord={handleViewEditRecord}
            handleDuplicateRecord={handleDuplicateRecord}
            handleSaveList={handleSaveList}
            setViewEditProject={setViewEditProject}
            setViewViewProject={setViewViewProject}
            deletingData={deletingData}
            clickedItem={clickedItem}
          />
        </>
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
  
  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    position: static;
    padding: 0.5rem;
    display: flex;
    width: 100vw;
  }
  
  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    position: static;
    padding: 0.5rem;
    display: flex;
    width: 100vw;
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

export default Projects;
