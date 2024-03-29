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
import Spinner from "../spinner";
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
  fetchingData,
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

  const handleImageClick = (image) => {
    //remove clicked image from list of available images
    setAvailableImages(availableImages.filter((i) => i._id !== image._id));

    //add clicked image to list of selected images
    setSelectedImages([...selectedImages, image]);

    //add clicked image to currentProject
    if (selectedImages.length < 1) {
      //if only image, set as main image
      setCurrentProject({
        ...currentProject,
        screenshots: [...currentProject?.screenshots, image],
        mainImage: image,
      });
    } else {
      setCurrentProject({
        ...currentProject,
        screenshots: [...currentProject?.screenshots, image],
      });
    }
  };

  const handleSelectedItemClick = (image) => {
    //remove clicked image from list of selected images
    setSelectedImages(selectedImages.filter((i) => i._id !== image._id));

    //add clicked images to list of available images
    setAvailableImages([...availableImages, image]);

    //remove clicked image from currentProject
    if (image._id === currentProject.mainImage?._id) {
      //if selected image is main image, remove mainImage also
      setCurrentProject(() => ({
        ...currentProject,
        screenshots: currentProject?.screenshots.filter(
          (i) => i._id !== image._id
        ),
        mainImage: null,
      }));
    } else {
      setCurrentProject(() => ({
        ...currentProject,
        screenshots: currentProject?.screenshots.filter(
          (i) => i._id !== image._id
        ),
      }));
    }
  };

  const handleMainImageSelect = (image) => {
    //set clicked image as main Image
    setCurrentProject({
      ...currentProject,
      mainImage: image,
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
                    handleItemClick={handleImageClick}
                    selectable={false}
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
                    selectable={true}
                    handleMainImageSelect={handleMainImageSelect}
                    mainImage={currentProject.mainImage}
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
          ) : fetchingData ? (
            <Spinner size="25px" alignment="flex-end" />
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

    .view-container,
    .included-container,
    .available-container {
      width: 50%;
      height: 100%;
      h4 {
        margin-bottom: 0.5rem;
      }
      .list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
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

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
  }

  //481px — 768px: iPads, Tablets
  @media screen and (min-width: 481px) and (max-width: 769px) and (orientation: portrait) {
  }

  //481px — 768px: iPads, Tablets
  //@media screen and (min-width: 481px) and (max-width: 769px) and (orientation: landscape) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {}

  //1025px — 1200px: Desktops, large screens
  @media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {
  }

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  @media screen and (min-width: 1921px) and (orientation: landscape) {
  }
`;

export default Step5;
