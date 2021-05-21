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

const Step2 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  currentProject,
  setCurrentProject,
  libraries,
}) {
  //If NEW project then selected libraries should be empty - set in ProjectAddEdit.jsx
  //If EDIT project then selected libraries should be loaded for specific project
  const [selectedLibraries, setSelectedLibraries] = useState(
    currentProject.libraries
  );

  //If NEW project then available libraries should show all libraries
  //If EDIT project then available libraries should be ALL libraries MINUS those that have been selected
  const [availableLibraries, setAvailableLibraries] = useState(
    _.differenceWith(libraries, selectedLibraries, _.isEqual)
  );

  const handleLibItemClick = (library) => {
    //remove clicked library from list of available libraries
    setAvailableLibraries(
      availableLibraries.filter((l) => l._id !== library._id)
    );

    //add clicked library to list of selected libraries
    setSelectedLibraries([...selectedLibraries, library]);

    //add clicked library to currentProject
    setCurrentProject({
      ...currentProject,
      libraries: [...selectedLibraries, library],
    });
  };

  const handleSelectedItemClick = (library) => {
    //remove clicked library from list of selected libraries
    setSelectedLibraries(
      selectedLibraries.filter((l) => l._id !== library._id)
    );

    //add clicked library to list of available libraries
    setAvailableLibraries([...availableLibraries, library]);

    //remove clicked library from currentProject
    setCurrentProject({
      ...currentProject,
      libraries: currentProject?.libraries.filter((l) => l._id !== library._id),
    });
  };

  return (
    <StyledStep>
      <h3>Libraries</h3>
      <div className="form-information">
        <div className="available-container">
          <h4>Available:</h4>
          <div className="list">
            {availableLibraries
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((l) => (
                <ListItem key={uuidv4()} handleItemClick={handleLibItemClick}>
                  {l}
                </ListItem>
              ))}
          </div>
        </div>

        <div className="included-container">
          <h4>Included:</h4>
          <div className="list">
            {selectedLibraries
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((l) => (
                <ListItem
                  key={uuidv4()}
                  handleItemClick={handleSelectedItemClick}
                >
                  {l}
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
          {currentStep < totalSteps && (
            <FaArrowCircleRight
              className="nav-buttons"
              onClick={() => nextStep()}
            />
          )}
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

  h3 {
    text-align: center;
    margin-bottom: 1rem;
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
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 0.5rem;
        width: 100%;
        height: 93%;
        padding: 0.5rem;
        box-shadow: 0 0 3px 5px #688297;
        overflow-y: scroll;
        border-radius: 4px;
      }
    }
  }
`;

export default Step2;
