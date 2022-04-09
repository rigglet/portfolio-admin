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

const Step3 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  currentProject,
  setCurrentProject,
  packages,
  allIcons,
}) {
  //If NEW package then selected packages should be empty - set in PackageAddViewEdit.jsx
  //If EDIT package then selected packages should be loaded for specific project
  const [selectedPackages, setSelectedPackages] = useState(
    currentProject.packages
  );

  //If NEW package then available packages should show all packages
  //If EDIT package then available packages should be ALL packages MINUS those that have been selected
  const [availablePackages, setAvailablePackages] = useState(
    _.differenceWith(packages, selectedPackages, _.isEqual)
  );

  const handlePackItemClick = (pack) => {
    //remove clicked package from list of available packages
    setAvailablePackages(availablePackages.filter((p) => p._id !== pack._id));

    //add clicked package to list of selected packages
    setSelectedPackages([...selectedPackages, pack]);

    //add clicked package to currentProject
    setCurrentProject({
      ...currentProject,
      packages: [...selectedPackages, pack],
    });
  };

  const handleSelectedItemClick = (pack) => {
    //remove clicked package from list of selected packages
    setSelectedPackages(selectedPackages.filter((p) => p._id !== pack._id));

    //add clicked packages to list of available packages
    setAvailablePackages([...availablePackages, pack]);

    //remove clicked package from currentProject
    setCurrentProject({
      ...currentProject,
      packages: currentProject?.packages.filter((p) => p._id !== pack._id),
    });
  };

  return (
    <StyledStep>
      <h3>Packages</h3>
      <div className="form-information">
        <div className="available-container">
          <h4>Available:</h4>
          <div className="list">
            {availablePackages
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((p) => (
                <ListItem
                  key={uuidv4()}
                  handleItemClick={handlePackItemClick}
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
            {selectedPackages
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

export default Step3;
