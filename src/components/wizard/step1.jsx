import { useState } from "react";
import styled from "styled-components";
//dates
import { DateTime } from "luxon";
//icons
import {
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaGithub,
} from "react-icons/fa";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icons
import { CgWebsite } from "react-icons/cg";
import { RiAddCircleLine } from "react-icons/ri";
import { BiMinusCircle } from "react-icons/bi";

const Step1 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  currentProject,
  setCurrentProject,
}) {
  const notify = (type) => {
    switch (type) {
      case "NOFEATURE":
        toast.dark(`Please enter a feature`);
        break;
      case "NOHIGHLIGHT":
        toast.dark(`Please enter a highlight`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  const [feature, setFeature] = useState("");
  const [highlight, setHighlight] = useState("");

  const handleAddFeature = () => {
    if (feature !== "") {
      setCurrentProject(() => ({
        ...currentProject,
        features: [...currentProject.features, feature],
      }));

      setFeature("");
    } else {
      //Toast message
      notify("NOFEATURE");
    }
  };

  const handleDeleteFeature = (clickedFeature) => {
    console.log(clickedFeature);
    setCurrentProject({
      ...currentProject,
      features: [
        ...currentProject.features.filter((f) => f !== clickedFeature),
      ],
    });
  };

  const handleAddHighlight = () => {
    if (highlight !== "") {
      setCurrentProject(() => ({
        ...currentProject,
        highlights: [...currentProject.highlights, highlight],
      }));

      setHighlight("");
    } else {
      //Toast message
      notify("NOHIGHLIGHT");
    }
  };

  const handleDeleteHighlight = (clickedHighlight) => {
    setCurrentProject({
      ...currentProject,
      highlights: [
        ...currentProject.highlights.filter((h) => h !== clickedHighlight),
      ],
    });
  };

  return (
    <StyledStep>
      <ToastContainer
        closeButton={false}
        transition={Zoom}
        position="bottom-center"
        draggable={false}
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />

      <h3>Project information</h3>
      <div className="form-information">
        <div className="details">
          <div className="input-item">
            <label htmlFor="projectName">Project name:</label>
            <input
              value={currentProject?.projectName}
              type="text"
              name="projectName"
              id="projectName"
              autoComplete="off"
              size="40"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="input-item">
            <label htmlFor="version">Version:</label>
            <input
              type="text"
              name="version"
              id="version"
              value={currentProject?.version}
              autoComplete="off"
              size="10"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <label htmlFor="author">Author:</label>
            <input
              name="author"
              id="author"
              value={currentProject?.author}
              type="text"
              autoComplete="off"
              size="15"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <label htmlFor="featured">Featured:</label>
            <input
              checked={currentProject?.featured}
              type="checkbox"
              name="featured"
              id="featured"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: !currentProject.featured,
                })
              }
            />
          </div>
          <div className="input-item">
            <label htmlFor="included">Included:</label>
            <input
              checked={currentProject?.included}
              type="checkbox"
              name="included"
              id="included"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: !currentProject.included,
                })
              }
            />
          </div>
        </div>
        <div className="addresses">
          <div className="input-item">
            <label htmlFor="github">Github:</label>
            <div className="address-item">
              <FaGithub className="address-icon" />
              <input
                value={currentProject?.githubLink}
                type="text"
                name="githubLink"
                id="githubLink"
                autoComplete="off"
                size="40"
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="website">Website:</label>
            <div className="address-item">
              <CgWebsite className="address-icon" />
              <input
                value={currentProject?.website}
                type="text"
                id="text"
                name="website"
                autoComplete="off"
                size="40"
                onChange={(e) =>
                  setCurrentProject({
                    ...currentProject,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="descriptions">
          <div className="input-item">
            <label htmlFor="short">Short description:</label>
            <textarea
              value={currentProject?.shortDescription}
              type="text"
              name="shortDescription"
              id="shortDescription"
              autoComplete="off"
              cols="50"
              rows="3"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <label htmlFor="description">Description:</label>
            <textarea
              value={currentProject?.projectDescription}
              type="text"
              name="projectDescription"
              id="projectDescription"
              autoComplete="off"
              cols="50"
              rows="3"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="features">
          <div className="input-item">
            <div className="label-icons">
              <label htmlFor="features">Features:</label>
              <RiAddCircleLine
                className="header-icon"
                onClick={handleAddFeature}
              />
            </div>
            <input
              type="text"
              name="features"
              id="features"
              autoComplete="off"
              size="60"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
            />
            <div className="features-container">
              {currentProject?.features?.map((f) => (
                <span key={uuidv4()}>
                  {f}
                  <BiMinusCircle
                    className="minus-icon"
                    onClick={() => handleDeleteFeature(f)}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="input-item">
            <div className="label-icons">
              <label htmlFor="highlights">Highlights:</label>
              <RiAddCircleLine
                className="header-icon"
                onClick={handleAddHighlight}
              />
            </div>
            <input
              type="text"
              name="highlights"
              id="highlights"
              autoComplete="off"
              size="60"
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
            />

            <div className="highlights-container">
              {currentProject?.highlights?.map((h) => (
                <span key={uuidv4()}>
                  {h}
                  <BiMinusCircle
                    className="minus-icon"
                    onClick={() => handleDeleteHighlight(h)}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="dates">
          <div className="input-item">
            <label htmlFor="started">Started:</label>
            <input
              value={DateTime.fromISO(currentProject?.startedDate).toFormat(
                "yyyy-MM-dd"
              )}
              type="date"
              name="startedDate"
              id="started"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <label>Completed:</label>
            <input
              value={DateTime.fromISO(currentProject?.completedDate).toFormat(
                "yyyy-MM-dd"
              )}
              type="date"
              name="completedDate"
              id="completed"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="input-item">
            <label htmlFor="added">Added:</label>
            <input
              value={DateTime.fromISO(currentProject?.addedDate).toFormat(
                "yyyy-MM-dd"
              )}
              type="date"
              name="addedDate"
              id="added"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
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
    //margin-bottom: 1rem;
  }
  .form-information {
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    row-gap: 1rem;

    .details,
    .dates,
    .features,
    .descriptions,
    .addresses {
      width: 100%;
      display: flex;
      justify-content: space-around;
    }

    //feature and highlight section
    .label-icons {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      .header-icon {
        cursor: pointer;
        width: 1.4rem;
        height: 1.4rem;
        &:hover {
          transition: 0.3s ease;
          transform: scale(1.1);
        }
      }
    }

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
    label {
      font-weight: bold;
      font-size: 12pt;
      font-variant-caps: all-small-caps;
      margin-bottom: 0.5rem;
    }
    .highlights-container,
    .features-container {
      margin-top: 0.5rem;
      width: 100%;
      height: 66px;
      color: #0c395e;
      border-radius: 4px;
      border: 1px solid #313131;
      padding: 0.25rem;
      font-family: "Poppins", sans-serif;
      font-weight: 300;
      font-size: 10pt;
      overflow-y: scroll;
      span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .minus-icon {
          cursor: pointer;
          width: 1.4rem;
          height: 1.4rem;
          color: #313131;
        }
      }
    }

    input,
    textarea {
      width: 100%;
      color: #0c395e;
      resize: none;
      outline: solid 3px transparent;
      border-radius: 4px;
      border: 1px solid #313131;
      padding: 0.25rem;
      font-family: "Poppins", sans-serif;
      font-weight: 300;
      font-size: 10pt;
    }

    input:focus,
    textarea:focus {
      outline: solid 3px #688297;
      border-color: transparent;
    }
    input[type="date"] {
      font-size: 10pt;
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
  }
`;

export default Step1;
