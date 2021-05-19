import styled from "styled-components";
//dates
import { DateTime } from "luxon";

//icons
import {
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaGithub,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

const Step1 = function ({
  currentStep,
  totalSteps,
  previousStep,
  nextStep,
  formType,
  currentProject,
  setCurrentProject,
}) {
  return (
    <StyledStep>
      <h2>Project information</h2>
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
                disabled={formType === "VIEW" ? true : false}
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
              rows="4"
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
              rows="4"
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  [e.target.name]: e.target.value,
                })
              }
            />
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
  height: 82vh;
  color: #313131;

  h2 {
    text-align: center;
  }

  .form-information {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    row-gap: 2rem;

    .details,
    .dates,
    .descriptions,
    .addresses {
      width: 100%;
      display: flex;
      justify-content: space-around;
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
  }
`;

export default Step1;
