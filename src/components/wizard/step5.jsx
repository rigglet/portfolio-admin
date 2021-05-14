import { useState, useEffect } from "react";
import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//icons
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
//forms
import { useForm } from "react-hook-form";
import { getData } from "../../api/api";
//components
import ListItem from "./listItem";

const Step5 = function (props) {
  const { register, handleSubmit } = useForm();

  const {
    auth,
    currentStep,
    totalSteps,
    previousStep,
    nextStep,
    handleSaveStep,
    handleSaveProject,
    formType,
    showSubmit,
    currentProject,
  } = props;

  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(
    () => {
      async function getTable() {
        return await getData(auth, "images");
      }
      getTable().then((result) => {
        if (result.status === 200) {
          setImages(result.data);
        }
      });
    },
    // eslint-disable-next-line
    []
  );

  const handleTechItemClick = (tech) => {
    setImages(images.filter((p) => p._id !== tech._id));
    setSelectedImages([...selectedImages, tech]);
  };

  const handleSelectedItemClick = (tech) => {
    setSelectedImages(selectedImages.filter((p) => p._id !== tech._id));
    setImages([...images, tech]);
  };

  return (
    <StyledStep>
      <h2>Technologies</h2>
      <form onSubmit={handleSubmit(handleSaveProject)}>
        <div className="form-information">
          <h4>Available:</h4>
          <div className="list">
            {images
              .filter((p) => !selectedImages.includes(p))
              .map((p) => (
                <ListItem key={uuidv4()} handleItemClick={handleTechItemClick}>
                  {p}
                </ListItem>
              ))}
          </div>
          <h4>Included:</h4>
          <div className="list">
            {selectedImages.map((p) => (
              <ListItem
                key={uuidv4()}
                handleItemClick={handleSelectedItemClick}
              >
                {p}
              </ListItem>
            ))}
          </div>
          <input
            type="hidden"
            {...register("technologies")}
            defaultValue={selectedImages.map((p) => p._id)}
          />
        </div>
        <div className="footer">
          <div className="stepNav">
            <div className="arrowBox">
              {currentStep > 1 ? (
                <FaArrowCircleLeft
                  className="nav-buttons"
                  onClick={() => {
                    handleSaveStep({
                      technologies: selectedImages.map((p) => p._id),
                    });
                    previousStep();
                  }}
                />
              ) : (
                ""
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
                  onClick={() => {
                    handleSaveStep(selectedImages.map((p) => p._id));
                    nextStep();
                  }}
                />
              ) : (
                <input type="submit" />
              )}
            </div>
          </div>
        </div>
      </form>
    </StyledStep>
  );
};

const StyledStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 3rem 3rem 3rem;
  width: 100%;
  height: 80vh;
  color: #0c395e;
  .form-information {
    height: 85%;
    width: 100%;
    padding: 2rem;
    display: flex;
    column-gap: 4rem;
    .list {
      display: flex;
      flex-direction: column;
      //border: 1px solid #0c395e;
      box-shadow: 0 0 3px 5px #dededf;
      width: 100%;
      overflow-y: scroll;
      align-items: center;
      gap: 0.5rem;
      padding: 0 0.5rem;
    }
    form {
      .address-item {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        .address-icon {
          width: 2rem;
          height: 2rem;
        }
      }
      .input-item {
        display: flex;
        flex-direction: column;
      }
      display: flex;
      flex-direction: column;
      gap: 2rem;
      label {
        font-weight: bold;
        font-size: 12pt;
        font-variant-caps: all-small-caps;
        margin-bottom: 0.5rem;
      }
      input,
      textarea {
        color: #0c395e;
        padding: 0.25rem;
        font-size: 14pt;
        font-family: "Roboto Condensed", sans-serif;
        resize: none;
        outline: solid 3px transparent;
      }
      input:focus,
      textarea:focus {
        outline: solid 3px #688297;
        border-color: transparent;
      }
      input[type="date"] {
        font-size: 11pt;
        color: #0c395e;
        ::-webkit-calendar-picker-indicator {
          color: #0c395e;
        }
      }
      input[type="checkbox"] {
        width: 1.2rem;
        height: 1.2rem;
        background-color: white;
        border: 2px solid #0c395e;
        border-radius: 4px;
        outline: none;
        cursor: pointer;
        transition-duration: 0.3s;
      }

      .details,
      .dates,
      .descriptions,
      .addresses {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 3rem;
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .stepNav {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    justify-content: space-between;
    .nav-buttons {
      width: 2rem;
      height: 2rem;
      color: #688297;
      cursor: pointer;
    }
  }
  .progress {
    width: 80%;
  }
  progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 0.5rem;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }
  progress[value]::-webkit-progress-value {
    background-color: #688297;
    border-radius: 2px;
  }
`;

export default Step5;
