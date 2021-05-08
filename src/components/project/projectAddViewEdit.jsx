import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//forms
import { useForm } from "react-hook-form";
//UUID inique ID generator
//import { v4 as uuidv4 } from "uuid";
//icons
//import { TiTick, TiTimes } from "react-icons/ti";
//components
import StepWizard from "react-step-wizard";
import { default as StepInfo } from "../wizard/step1";
import { default as StepLibraries } from "../wizard/step2";
import { default as StepPackages } from "../wizard/step3";
import { default as StepTechnologies } from "../wizard/step4";

const ProjectAddViewEdit = function ({
  openingHookSetter,
  handleSaveProject,
  title,
  showSubmit,
  currentProject,
  formType,
  auth,
}) {
  const [formData, setFormData] = useState({});

  const handleSaveStep = (data) => {
    setFormData({ ...formData, ...data });
    console.log(formData);
  };

  // const handleStep = (data) => {
  //   setFormData({ ...formData, ...data });
  //   console.log(formData);
  // };

  return (
    <StyledProjectAddViewEdit>
      <div className="container">
        <button className="close" onClick={() => openingHookSetter(false)}>
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentProject?._id}</h5>
          <StepWizard>
            <StepInfo
              showSubmit={showSubmit}
              currentProject={currentProject}
              handleSaveStep={handleSaveStep}
              formType={formType}
            />
            <StepLibraries
              auth={auth}
              showSubmit={showSubmit}
              currentProject={currentProject}
              handleSaveStep={handleSaveStep}
              formType={formType}
            />
            <StepPackages
              auth={auth}
              showSubmit={showSubmit}
              currentProject={currentProject}
              handleSaveStep={handleSaveStep}
              formType={formType}
            />
            <StepTechnologies
              auth={auth}
              showSubmit={showSubmit}
              currentProject={currentProject}
              handleSaveStep={handleSaveStep}
              formType={formType}
              handleSaveProject={handleSaveProject}
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
        //margin-bottom: 0.5rem;
      }
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
    /* .image-gallery {
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
    } */
  }
`;

export default ProjectAddViewEdit;
