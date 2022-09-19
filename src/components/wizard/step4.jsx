import { useState } from "react";
import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
//components
import ListItem from "./listItem";
//lodash
let _ = require("lodash");

const Step4 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  currentProject,
  setCurrentProject,
  techs,
  allIcons,
}) {
  //If NEW technology then selected technologies should be empty - set in TechnologyAddViewEdit.jsx
  //If EDIT technology then selected technologies should be loaded for specific project
  const [selectedTechnologies, setSelectedTechnologies] = useState(
    currentProject.technologies
  );

  //If NEW tech then available techs should show all techs
  //If EDIT tech then available techs should be ALL techs MINUS those that have been selected
  const [availableTechnologies, setAvailableTechnologies] = useState(
    _.differenceWith(techs, selectedTechnologies, _.isEqual)
  );

  const handleTechItemClick = (tech) => {
    //remove clicked technology from list of available technologies
    setAvailableTechnologies(
      availableTechnologies.filter((t) => t._id !== tech._id)
    );

    //add clicked technology to list of selected technologies
    setSelectedTechnologies(() => [...selectedTechnologies, tech]);

    //add clicked technology to currentProject
    setCurrentProject(() => ({
      ...currentProject,
      technologies: [...selectedTechnologies, tech],
    }));
  };

  const handleSelectedItemClick = (tech) => {
    //remove clicked technology from list of selected technologies
    setSelectedTechnologies(() =>
      selectedTechnologies.filter((t) => t._id !== tech._id)
    );

    //add clicked technologies to list of available technologies
    setAvailableTechnologies(() => [...availableTechnologies, tech]);

    //remove clicked technology from currentProject
    setCurrentProject(() => ({
      ...currentProject,
      technologies: currentProject?.technologies.filter(
        (t) => t._id !== tech._id
      ),
    }));
  };

  return (
    <StyledStep>
      <h2>Technologies</h2>

      <div className="form-information">
        <div className="available-container">
          <h4>Available:</h4>
          <div className="list">
            {availableTechnologies
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((p) => (
                <ListItem
                  key={uuidv4()}
                  handleItemClick={handleTechItemClick}
                  allIcons={allIcons}
                >
                  {p}
                </ListItem>
              ))}
          </div>
        </div>

        <div className="included-container">
          <h4>Included:</h4>
          <div className="list">
            {selectedTechnologies
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((p) => (
                <ListItem
                  key={uuidv4()}
                  handleItemClick={handleSelectedItemClick}
                  allIcons={allIcons}
                >
                  {p}
                </ListItem>
              ))}
          </div>
        </div>
      </div>

      <div className="stepNav">
        <div className="arrowBox">
          {currentStep > 1 && (
            <FaArrowCircleLeft
              className="nav-buttons"
              onClick={() => previousStep()}
            />
          )}
        </div>
        <div className="progress">
          <progress
            id="progress"
            value={currentStep}
            max={totalSteps}
          ></progress>
        </div>
        <div className="arrowBox">
          <FaArrowCircleRight
            className="nav-buttons"
            onClick={() => nextStep()}
          />
        </div>
      </div>
    </StyledStep>
  );
};

const StyledStep = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 75vh;
  color: #313131;
  justify-content: space-between;

  h2 {
    text-align: center;
  }

  .form-information {
    display: flex;
    height: 80%;
    width: 100%;
    column-gap: 2rem;

    .included-container,
    .available-container {
      width: 50%;
      height: 100%;
      h4 {
        margin-bottom: 0.5rem;
      }
      .list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        grid-template-rows: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
        padding: 1rem;
        height: 93%;
        box-shadow: 0 0 3px 5px #688297;
        overflow-y: scroll;
        border-radius: 4px;
      }
    }
  }
`;

export default Step4;
