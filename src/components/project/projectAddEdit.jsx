import styled from "styled-components";
import { motion } from "framer-motion";
//dates
import { DateTime } from "luxon";
//components
import StepWizard from "react-step-wizard";
import { default as StepInfo } from "../wizard/step1";
import { default as StepLibraries } from "../wizard/step2";
import { default as StepPackages } from "../wizard/step3";
import { default as StepTechnologies } from "../wizard/step4";
import { default as StepImages } from "../wizard/step5";
import CloseButton from "../closeButton";
import { MdWeb } from "react-icons/md";

const ProjectAddEdit = function ({
  openingHookSetter,
  handleSaveProject,
  handleEditProject,
  title,
  currentProject,
  setCurrentProject,
  formType,
  images,
  techs,
  packages,
  libraries,
  fetchingData,
}) {
  return (
    <StyledProjectAddEdit>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentProject}
          resetObject={{
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
          }}
        />

        <div className="titleHeader">
          <MdWeb className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentProject?._id}</h5>}
        </div>

        <StepWizard>
          <StepInfo
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          />
          <StepLibraries
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            libraries={libraries}
          />
          <StepPackages
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            packages={packages}
          />
          <StepTechnologies
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            techs={techs}
          />
          <StepImages
            formType={formType}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
            handleSaveProject={handleSaveProject}
            handleEditProject={handleEditProject}
            images={images}
            fetchingData={fetchingData}
          />
        </StepWizard>
      </div>
    </StyledProjectAddEdit>
  );
};

const StyledProjectAddEdit = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 90vw;
    height: 90vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    padding: 2rem;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

export default ProjectAddEdit;
