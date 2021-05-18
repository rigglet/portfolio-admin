import { useState } from "react";
import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
//components
import ListItem from "./listItem";

const Step4 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  currentProject,
  setCurrentProject,
  techs,
  setTechs,
}) {
  const [selectedTechs, setSelectedTechs] = useState([]);

  const handleTechItemClick = (tech) => {
    setTechs(techs.filter((t) => t._id !== tech._id));
    setSelectedTechs([...selectedTechs, tech]);
    setCurrentProject({
      ...currentProject,
      technologies: [...currentProject?.technologies, tech._id],
    });
  };

  const handleSelectedItemClick = (tech) => {
    setSelectedTechs(selectedTechs.filter((t) => t._id !== tech._id));
    setTechs([...techs, tech]);
    setCurrentProject({
      ...currentProject,
      technologies: currentProject?.technologies.filter((t) => t !== tech._id),
    });
  };

  return (
    <StyledStep>
      <h2>Technologies</h2>

      <div className="form-information">
        <div className="available-container">
          <h4>Available:</h4>
          <div className="list">
            {techs
              .filter((p) => !selectedTechs.includes(p))
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((p) => (
                <ListItem key={uuidv4()} handleItemClick={handleTechItemClick}>
                  {p}
                </ListItem>
              ))}
          </div>
        </div>

        <div className="included-container">
          <h4>Included:</h4>
          <div className="list">
            {selectedTechs
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((p) => (
                <ListItem
                  key={uuidv4()}
                  handleItemClick={handleSelectedItemClick}
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

export default Step4;
