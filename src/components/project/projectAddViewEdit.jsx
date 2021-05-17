import styled from "styled-components";
import { motion } from "framer-motion";
//components
import StepWizard from "react-step-wizard";
import { default as StepInfo } from "../wizard/step1";
import { default as StepLibraries } from "../wizard/step2";
import { default as StepPackages } from "../wizard/step3";
import { default as StepTechnologies } from "../wizard/step4";
import { default as StepImages } from "../wizard/step5";

const ProjectAddViewEdit = function ({
  openingHookSetter,
  handleSaveProject,
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
    <StyledProjectAddViewEdit>
      <div className="container">
        <button
          className="close"
          onClick={() => {
            openingHookSetter(false);
            setCurrentProject({});
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
              setLibraries={setLibraries}
            />
            <StepPackages
              formType={formType}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              packages={packages}
              setPackages={setPackages}
            />
            <StepTechnologies
              formType={formType}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              techs={techs}
              setTechs={setTechs}
            />
            <StepImages
              formType={formType}
              currentProject={currentProject}
              setCurrentProject={setCurrentProject}
              handleSaveProject={handleSaveProject}
              images={images}
              setImages={setImages}
            />
          </StepWizard>
        </div>
      </div>
    </StyledProjectAddViewEdit>
  );
};

const StyledProjectAddViewEdit = styled(motion.div)`
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

export default ProjectAddViewEdit;
