import { useState } from "react";
import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
//components
import ListItem from "./listItem";

const Step2 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  currentProject,
  setCurrentProject,
  libraries,
  setLibraries,
}) {
  const [selectedLibraries, setSelectedLibraries] = useState([]);

  const handleLibItemClick = (library) => {
    setLibraries(libraries.filter((l) => l._id !== library._id));
    setSelectedLibraries([...selectedLibraries, library]);

    setCurrentProject({
      ...currentProject,
      libraries: [...currentProject?.libraries, library._id],
    });
  };

  const handleSelectedItemClick = (library) => {
    setSelectedLibraries(
      selectedLibraries.filter((l) => l._id !== library._id)
    );
    setLibraries([...libraries, library]);
    setCurrentProject({
      ...currentProject,
      libraries: currentProject?.libraries.filter((l) => l !== library._id),
    });
  };

  return (
    <StyledStep>
      <h2>Libraries</h2>
      <div className="form-information">
        <div className="available-container">
          <h4>Available:</h4>
          <div className="list">
            {libraries
              .filter((l) => !selectedLibraries.includes(l))
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
  height: 82vh;
  color: #313131;

  h2 {
    text-align: center;
  }

  .form-information {
    display: flex;
    height: 100%;
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
        height: 100%;
        padding: 0.5rem;
        box-shadow: 0 0 3px 5px #688297;
        overflow-y: scroll;
        border-radius: 4px;
      }
    }
  }
`;

export default Step2;
