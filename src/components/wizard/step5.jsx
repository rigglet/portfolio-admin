import { useState } from "react";
import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
//components
import ImageItem from "./imageItem";
//components
import SubmitButton from "../submitButton";
//lodash
let _ = require("lodash");

const Step5 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  handleSaveProject,
  handleEditProject,
  formType,
  currentProject,
  setCurrentProject,
  images,
}) {
  //If NEW image then selected technologies should be empty - set in ImageAddViewEdit.jsx
  //If EDIT image then selected technologies should be loaded for specific project
  const [selectedImages, setSelectedImages] = useState(
    currentProject.screenshots
  );

  //get project images only
  const projectImages = images.filter((image) => image.category !== "profile");

  //If NEW tech then available techs should show all techs
  //If EDIT tech then available techs should be ALL techs MINUS those that have been selected
  const [availableImages, setAvailableImages] = useState(
    _.differenceWith(projectImages, selectedImages, _.isEqual)
  );

  const handleTechItemClick = (image) => {
    //remove clicked image from list of available technologies
    setAvailableImages(availableImages.filter((i) => i._id !== image._id));

    //add clicked image to list of selected technologies
    setSelectedImages([...selectedImages, image]);

    //add clicked image to currentProject
    setCurrentProject({
      ...currentProject,
      screenshots: [...currentProject?.screenshots, image],
    });
  };

  const handleSelectedItemClick = (image) => {
    //remove clicked image from list of selected technologies
    setSelectedImages(selectedImages.filter((i) => i._id !== image._id));

    //add clicked technologies to list of available technologies
    setAvailableImages([...availableImages, image]);

    //remove clicked image from currentProject
    setCurrentProject({
      ...currentProject,
      screenshots: currentProject?.screenshots.filter(
        (i) => i._id !== image._id
      ),
    });
  };

  return (
    <StyledStep>
      <h2>Screenshots</h2>
      <div className="form-information">
        <>
          <div className="available-container">
            <h4>Available:</h4>
            <div className="list">
              {availableImages
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((p) => (
                  <ImageItem
                    key={uuidv4()}
                    handleItemClick={handleTechItemClick}
                  >
                    {p}
                  </ImageItem>
                ))}
            </div>
          </div>
          <div className="included-container">
            <h4>Included:</h4>

            <div className="list">
              {selectedImages
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((p) => (
                  <ImageItem
                    key={uuidv4()}
                    handleItemClick={handleSelectedItemClick}
                  >
                    {p}
                  </ImageItem>
                ))}
            </div>
          </div>
        </>
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
          {currentStep < totalSteps ? (
            <FaArrowCircleRight
              className="nav-buttons"
              onClick={() => nextStep()}
            />
          ) : (
            <SubmitButton
              type={formType}
              editFunction={handleEditProject}
              saveFunction={handleSaveProject}
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
    .view-container,
    .included-container,
    .available-container {
      width: 50%;
      height: 100%;
      h4 {
        margin-bottom: 0.5rem;
      }
      .list {
        z-index: 100;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        box-shadow: 0 0 3px 5px #688297;
        overflow-y: scroll;
        border-radius: 4px;
      }
    }
    .view-container {
      width: 100%;
      img {
        height: auto;
        width: 425px;
        object-fit: contain;
        object-position: center center;
      }
    }
  }
`;

export default Step5;
