import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
//import { v4 as uuidv4 } from "uuid";
//icons
//import { TiTick, TiTimes } from "react-icons/ti";
//components
import StepWizard from "react-step-wizard";
import { default as StepInfo } from "../wizard/step1";
import { default as StepPackages } from "../wizard/step2";
import { default as StepLibraries } from "../wizard/step3";
import { default as StepTechnologies } from "../wizard/step4";

const ProjectAdd = function ({ setViewAddProject }) {
  const [formData, setFormData] = useState({});
  const handleRegistration = (data) => console.log(data);
  const handleStep = (data) => {
    setFormData({ ...formData, ...data });
    console.log({ data });
  };
  return (
    <StyledProjectAdd>
      <div className="container">
        <button className="close" onClick={() => setViewAddProject(false)}>
          &#10008;
        </button>
        <div className="information">
          <StepWizard handleStep={handleStep}>
            <StepInfo handleStep={handleStep} />
            <StepPackages />
            <StepLibraries />
            <StepTechnologies handleRegistration={handleRegistration} />
          </StepWizard>
        </div>
      </div>
    </StyledProjectAdd>
  );
};

const StyledProjectAdd = styled(motion.div)`
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
    background-color: white;
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;

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

export default ProjectAdd;
