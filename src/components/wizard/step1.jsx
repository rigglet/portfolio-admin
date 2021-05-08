import styled from "styled-components";
//dates
import { DateTime } from "luxon";
//calendar
//import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
//icons
import {
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaGithub,
} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
//forms
import { useForm } from "react-hook-form";

const Step1 = function (props) {
  const { register, getValues } = useForm();

  const {
    currentStep,
    totalSteps,
    previousStep,
    nextStep,
    handleSaveStep,
    formType,
    showSubmit,
    currentProject,
  } = props;

  //console.log(currentProject?.startedDate);

  return (
    <StyledStep>
      <h2>Project information</h2>
      <div className="form-information">
        <form>
          <div className="details">
            <input
              type="hidden"
              {...register("formtype")}
              defaultValue={formType}
            />
            <input
              type="hidden"
              {...register("_id")}
              defaultValue={currentProject?._id}
            />

            <div className="input-item">
              <label htmlFor="projectName">Project name:</label>
              <input
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultValue={currentProject?.projectName}
                type="text"
                {...register("projectName")}
                autoComplete="off"
                size="40"
              />
            </div>

            <div className="input-item">
              <label htmlFor="version">Version:</label>
              <input
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultValue={currentProject?.version}
                type="text"
                {...register("version")}
                autoComplete="off"
                size="10"
              />
            </div>
            <div className="input-item">
              <label htmlFor="author">Author:</label>
              <input
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultValue={currentProject?.author}
                type="text"
                {...register("author")}
                autoComplete="off"
                size="15"
              />
            </div>
            <div className="input-item">
              <label htmlFor="featured">Featured:</label>
              <input
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultChecked={currentProject?.featured}
                type="checkbox"
                {...register("featured")}
                id="featured"
              />
            </div>
            <div className="input-item">
              <label htmlFor="included">Included:</label>
              <input
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultChecked={currentProject?.included}
                type="checkbox"
                {...register("included")}
                id="included"
              />
            </div>
          </div>
          <div className="addresses">
            <div className="input-item">
              <label htmlFor="github">Github:</label>
              <div className="address-item">
                <FaGithub className="address-icon" />
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  defaultValue={currentProject?.githubLink}
                  type="text"
                  {...register("githubLink")}
                  autoComplete="off"
                  size="40"
                />
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="website">Website:</label>
              <div className="address-item">
                <CgWebsite className="address-icon" />
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  defaultValue={currentProject?.website}
                  type="text"
                  {...register("website")}
                  autoComplete="off"
                  size="40"
                />
              </div>
            </div>
          </div>

          <div className="descriptions">
            <div className="input-item">
              <label htmlFor="short">Short description:</label>
              <textarea
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultValue={currentProject?.shortDescription}
                type=""
                {...register("shortDescription")}
                autoComplete="off"
                cols="50"
                rows="4"
              />
            </div>
            <div className="input-item">
              <label htmlFor="description">Description:</label>
              <textarea
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                defaultValue={currentProject?.projectDescription}
                type="text"
                {...register("projectDescription")}
                autoComplete="off"
                cols="50"
                rows="4"
              />
            </div>
          </div>
          <div className="dates">
            <div className="input-item">
              <label>Added:</label>
              {!showSubmit ? (
                <p>
                  {DateTime.fromISO(currentProject?.addedDate)
                    .setLocale("uk")
                    .toLocaleString({
                      timeZoneName: "short",
                    })}
                </p>
              ) : (
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  defaultValue={currentProject?.addedDate}
                  type="date"
                  {...register("addedDate")}
                  id="added"
                />
              )}
            </div>
            <div className="input-item">
              <label>Started:</label>
              {!showSubmit ? (
                <p>
                  {DateTime.fromISO(currentProject?.addedDate)
                    .setLocale("uk")
                    .toLocaleString({
                      timeZoneName: "short",
                    })}
                </p>
              ) : (
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  defaultValue={currentProject?.startedDate}
                  type="date"
                  {...register("startedDate")}
                  id="started"
                />
              )}
            </div>
            <div className="input-item">
              <label>Completed:</label>
              {!showSubmit ? (
                <p>
                  {DateTime.fromISO(currentProject?.addedDate)
                    .setLocale("uk")
                    .toLocaleString({
                      timeZoneName: "short",
                    })}
                </p>
              ) : (
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  defaultValue={currentProject?.completedDate}
                  type="date"
                  {...register("completedDate")}
                  id="completed"
                />
              )}
            </div>
          </div>
          {/* {showSubmit ? <button type="submit">Submit</button> : ""} */}

          <div className="footer">
            <div className="stepNav">
              <div className="arrowBox">
                {currentStep > 1 ? (
                  <FaArrowCircleLeft
                    className="nav-buttons"
                    onClick={() => {
                      //handleStep(getValues());
                      handleSaveStep(getValues());
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
                      handleSaveStep(getValues());
                      nextStep();
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </StyledStep>
  );
};

const StyledStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 0rem 3rem 0rem 3rem;
  width: 100%;
  height: 80vh;
  color: #0c395e;
  .form-information {
    height: 100%;
    width: 100%;
    //border: 1px solid red;
    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
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

export default Step1;
