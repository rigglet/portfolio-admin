import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { getData } from "../api/api";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { RiAddCircleLine } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import { TiTick, TiTimes } from "react-icons/ti";
//image gallery
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
//components
import ProjectList from "./projectList";
import ProjectAdd from "./projectAdd";

function Projects({ auth, intialProjects }) {
  const [projects, setProjects] = useState(intialProjects);
  const [currentProject, setCurrentProject] = useState(null);
  const [viewProject, setViewProject] = useState(false);
  const [viewAddProject, setViewAddProject] = useState(false);

  // useEffect(
  //   () => {
  //     async function getTable() {
  //       return await getData(auth, "projects");
  //     }
  //     getTable().then((result) => {
  //       if (result.status === 200) {
  //         setProjects(result.data);
  //         //console.log(result.data);
  //       }
  //     });
  //   },
  //   // eslint-disable-next-line
  //   []
  // );

  const handleAddRecord = () => {
    setViewAddProject(true);
  };

  const updateProject = (project) => {
    setProjects([...projects.filter((p) => p._id !== project._id), project]);
    //update DB
  };

  const handleViewRecord = (id) => {
    console.log(id);
    //View full record
    setCurrentProject(projects.filter((p) => p._id === id)[0]);
  };

  const handleDeleteRecord = (id) => {
    setProjects([...projects.filter((p) => p._id !== id)]);
  };

  const handleEditRecord = (e) => {
    //console.log(technologies[index]._id);
    console.log(e);
  };

  const handleSaveProjects = () => {
    console.log("save projects to DB");
  };

  return (
    <StyledProjects>
      {
        //view ADD PROJECT modal
        viewAddProject ? (
          <ProjectAdd setViewAddProject={setViewAddProject} />
        ) : (
          ""
        )
      }
      {
        //view VIEW PROJECT modal
        currentProject ? (
          <ProjectView
            project={currentProject}
            setCurrentProject={setCurrentProject}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Projects</h1>
        <div className="toolbar">
          <FaRegSave className="h-icon" onClick={() => handleSaveProjects()} />
          <RiAddCircleLine
            className="h-icon"
            onClick={(e) => handleAddRecord(e)}
          />
        </div>
      </div>
      {projects.length > 0 ? (
        <ProjectList
          projects={projects}
          handleEditRecord={handleEditRecord}
          handleDeleteRecord={handleDeleteRecord}
          handleViewRecord={handleViewRecord}
          updateProject={updateProject}
        />
      ) : (
        ""
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

const ProjectView = function ({ project, setCurrentProject }) {
  const screenshots = project.screenshots.map((shot) => {
    return {
      original: shot,
    };
  });
  console.log(screenshots);
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  return (
    <StyledProjectView>
      <div className="container">
        <div className="close" onClick={() => setCurrentProject(null)}>
          &#10008;
        </div>
        <div className="information">
          <h4>Id:</h4>
          {project._id}
          <h4>Name:</h4>
          {project.projectName}
          <h4>Version:</h4>
          {project.version}
          <h4>Author:</h4>
          {project.author}
          <h4>Featured:</h4>
          {project.featured ? (
            <TiTick className="icon tick" />
          ) : (
            <TiTimes className="icon cross" />
          )}

          <h4>Included:</h4>
          {project.included ? (
            <TiTick className="icon tick" />
          ) : (
            <TiTimes className="icon cross" />
          )}

          <h4>Github:</h4>
          {project.githubLink}
          <h4>Website:</h4>
          {project.website}
          <h4>Short Description:</h4>
          {project.shortDescription}
          <h4>Long Description:</h4>
          {project.projectDescription}
          <h4>Libraries:</h4>
          {project.libraries.map((l) => (
            <p key={uuidv4()}>{l}</p>
          ))}
          <h4>Packages:</h4>
          {project.packages.map((p) => (
            <p key={uuidv4()}>{p}</p>
          ))}
          <h4>Technologies:</h4>
          {project.technologies.map((t) => (
            <p key={uuidv4()}>{t}</p>
          ))}
          <h4>Added:</h4>
          {project.addedDate}
          <h4>Started:</h4>
          {project.startedDate}
          <h4>Completed:</h4>
          {project.completedDate}
        </div>
        <div className="image-gallery">
          <div className="main">
            <h4>Main Image:</h4>
            <img src="project.mainImg" alt="main" />
          </div>
          <div className="screenshots">
            <ImageGallery
              items={images}
              showPlayButton={false}
              thumbnailPosition={"bottom"}
              //showIndex={true}
              //autoPlay={true}
              showBullets={true}
              showNav={false}
            />
          </div>
        </div>
      </div>
    </StyledProjectView>
  );
};

const StyledProjectView = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 99;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);
  .container {
    display: flex;
    flex-direction: column;
    width: 90vw;
    height: 90vh;
    background-color: white;
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    padding: 1rem;
    position: relative;

    .close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 2.2rem;
      padding-bottom: 0.5rem;
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      border: 0;
      outline: 0;
      cursor: pointer;
      font-size: 1.6rem;
      font-weight: bold;
      color: #ff4949;
      background-color: white;
      //border-radius: 50%;
      &:hover {
        transform: scale(1.1);
        transition: 0.3s ease;
      }
    }

    .information {
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
    }
    .image-gallery {
      display: flex;
      justify-content: space-between;
      .main {
        width: 60%;
        height: 50%;
      }
      .screenshots {
        width: 60%;
        height: 50%;
      }
    }
  }
`;

export default Projects;

// addedDate: null
// author: "req.body.author"
// completedDate: null
// featured: true
// githubLink: "req.body.githubLink"
// libraries: ["req.body.libraries"]
// mainImg: {type: "Buffer", data: Array(16)}
// packages: ["req.body.packages"]
// projectDescription: "req.body.projectDescription"
// projectName: "req.body.projectName"
// screenshots: [{…}]
// shortDescription: "req.body.shortDescription"
// startedDate: null
// technologies: ["req.body.technologies"]
// user: "606a02ec243b3b3e1831fcd1"
// version: "req.body.version"
// website: "req.body.website"
// __v: 0
// _id: "606a0cb82c805f37e4da5bb6"
