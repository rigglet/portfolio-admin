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

const ProjectAddEdit = function ({
  openingHookSetter,
  handleSaveProject,
  handleEditProject,
  title,
  currentProject,
  setCurrentProject,
  formType,
  images,
  setImages,
  techs,
  setTechs,
  packages,
  setPackages,
  libraries,
  setLibraries,
}) {
  return (
    <StyledProjectAddEdit>
      <div className="container">
        <button
          className="close"
          onClick={() => {
            openingHookSetter(false);
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
          }}
        >
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentProject?._id}</h5>
          <StepWizard>
            <StepInfo
              formType={formType}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
            />
            <StepLibraries
              formType={formType}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              libraries={libraries}
            />
            <StepPackages
              formType={formType}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              packages={packages}
            />
            <StepTechnologies
              formType={formType}
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
            />
          </StepWizard>
        </div>
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
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;

    .form-information {
      height: 85%;
      width: 100%;
      padding: 2rem;
      h1 {
        font-size: 16pt;
        font-weight: 600;
      }
    }
  }
`;

export default ProjectAddEdit;
