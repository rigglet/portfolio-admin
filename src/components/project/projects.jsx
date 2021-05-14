import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//data
import { getData, deleteData, postData, updateData } from "../../api/api";
//UUID inique ID generator
//import { v4 as uuidv4 } from "uuid";
//icons
import { RiAddCircleLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
//import { TiTick, TiTimes } from "react-icons/ti";
//image gallery
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
//components
import ProjectList from "./projectList";
import ProjectAddViewEdit from "./projectAddViewEdit";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Projects({ auth }) {
  const [projects, setProjects] = useState({});
  const [currentProject, setCurrentProject] = useState(null);
  const [viewViewProject, setViewViewProject] = useState(false);
  const [viewAddProject, setViewAddProject] = useState(false);
  const [viewEditProject, setViewEditProject] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Project EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Project ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Project ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  useEffect(() => {
    async function getTable() {
      return await getData(auth, "projects");
    }
    getTable().then((result) => {
      if (result.status === 200) {
        setProjects(result.data);
      }
    });
  }, []);

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

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveProject = async (data) => {
    console.log(data);
    const editProject = async () => {
      return await updateData(auth, "projects", data);
    };

    const addProject = async () => {
      return await postData(auth, "projects", data);
    };

    data?.formtype === "EDIT"
      ? editProject()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then(() => {
            setProjects([...projects.filter((p) => p._id !== data._id), data]);
          })
          .then(() => {
            setViewEditProject(false);
          })
      : addProject()
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
        viewAddProject ? (
          <ProjectAddViewEdit
            auth={auth}
            openingHookSetter={setViewAddProject}
            handleSaveProject={handleSaveProject}
            title="Add new project"
            showSubmit={true}
            formType={"NEW"}
          />
        ) : (
          ""
        )
      }

      {
        //view EDIT PROJECT modal
        viewEditProject ? (
          <ProjectAddViewEdit
            auth={auth}
            openingHookSetter={setViewEditProject}
            handleSaveProject={handleSaveProject}
            currentProject={currentProject}
            title="Edit project"
            showSubmit={true}
            formType={"EDIT"}
          />
        ) : (
          ""
        )
      }
      {
        //view VIEW PROJECT modal
        viewViewProject ? (
          <ProjectAddViewEdit
            openingHookSetter={setViewViewProject}
            currentProject={currentProject}
            setViewViewProject={setViewViewProject}
            title="View project"
            showSubmit={false}
            formType={"VIEW"}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Projects</h1>
        <div className="toolbar">
          {projects.length > 0 ? (
            <FaRegSave className="h-icon" onClick={() => handleSaveList()} />
          ) : (
            ""
          )}
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

// const ProjectView = function ({ project, setCurrentProject }) {
//   const screenshots = project.screenshots.map((shot) => {
//     return {
//       original: shot,
//     };
//   });
//   console.log(screenshots);
//   const images = [
//     {
//       original: "https://picsum.photos/id/1018/1000/600/",
//       thumbnail: "https://picsum.photos/id/1018/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1015/1000/600/",
//       thumbnail: "https://picsum.photos/id/1015/250/150/",
//     },
//     {
//       original: "https://picsum.photos/id/1019/1000/600/",
//       thumbnail: "https://picsum.photos/id/1019/250/150/",
//     },
//   ];
//   return (
//     <StyledProjectView>
//       <div className="container">
//         <div className="close" onClick={() => setCurrentProject(null)}>
//           &#10008;
//         </div>
//         <div className="information">
//           <h4>Id:</h4>
//           <p>{project._id}</p>
//           <h4>Name:</h4>
//           <p>{project.projectName}</p>
//           <h4>Version:</h4>
//           <p>{project.version}</p>
//           <h4>Author:</h4>
//           <p>{project.author}</p>
//           <h4>Featured:</h4>
//           <p>
//             {project.featured ? (
//               <TiTick className="icon tick" />
//             ) : (
//               <TiTimes className="icon cross" />
//             )}
//           </p>
//           <h4>Included:</h4>
//           <p>
//             {project.included ? (
//               <TiTick className="icon tick" />
//             ) : (
//               <TiTimes className="icon cross" />
//             )}
//           </p>

//           <h4>Github:</h4>
//           {project.githubLink}
//           <h4>Website:</h4>
//           {project.website}
//           <h4>Short Description:</h4>
//           {project.shortDescription}
//           <h4>Long Description:</h4>
//           {project.projectDescription}
//           <h4>Libraries:</h4>
//           {project.libraries.map((l) => (
//             <p key={uuidv4()}>{l}</p>
//           ))}
//           <h4>Packages:</h4>
//           {project.packages.map((p) => (
//             <p key={uuidv4()}>{p}</p>
//           ))}
//           <h4>Technologies:</h4>
//           {project.technologies.map((t) => (
//             <p key={uuidv4()}>{t}</p>
//           ))}
//           <h4>Added:</h4>
//           {project.addedDate}
//           <h4>Started:</h4>
//           {project.startedDate}
//           <h4>Completed:</h4>
//           {project.completedDate}
//         </div>
//         <div className="image-gallery">
//           <div className="main">
//             <h4>Main Image:</h4>
//             <img src="project.mainImg" alt="main" />
//           </div>
//           <div className="screenshots">
//             <ImageGallery
//               items={images}
//               showPlayButton={false}
//               thumbnailPosition={"bottom"}
//               //showIndex={true}
//               //autoPlay={true}
//               showBullets={true}
//               showNav={false}
//             />
//           </div>
//         </div>
//       </div>
//     </StyledProjectView>
//   );
// };

export default Projects;
