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
  setImages,
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleTechItemClick = (image) => {
    setImages(images.filter((i) => i._id !== image._id));
    setSelectedImages([...selectedImages, image]);
    setCurrentProject({
      ...currentProject,
      screenshots: [...currentProject?.screenshots, image._id],
    });
  };

  const handleSelectedItemClick = (image) => {
    setSelectedImages(selectedImages.filter((i) => i._id !== image._id));
    setImages([...images, image]);
    setCurrentProject({
      ...currentProject,
      screenshots: currentProject?.screenshots.filter((i) => i !== image._id),
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
              {images
                .filter(
                  (p) => !selectedImages.includes(p) && p.category !== "profile"
                )
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
