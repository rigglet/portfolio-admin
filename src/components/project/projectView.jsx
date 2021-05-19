import styled from "styled-components";
//UUID inique ID generator
//import { v4 as uuidv4 } from "uuid";
//dates
import { DateTime } from "luxon";

const ProjectView = function ({
  currentProject,
  setCurrentProject,
  title,
  openingHookSetter,
}) {
  return (
    <StyledProjectView>
      <div className="container">
        <button
          className="close"
          onClick={() => {
            openingHookSetter(false);
            setCurrentProject({});
          }}
        >
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentProject?._id}</h5>

          <p>
            {DateTime.fromISO(currentProject?.addedDate)
              .setLocale("uk")
              .toLocaleString({
                timeZoneName: "short",
              })}
          </p>
        </div>
      </div>
    </StyledProjectView>
  );
};

const StyledProjectView = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 80vw;
    height: 80vh;
    background-color: #ebebeb;
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;

    .form-information {
      height: 100%;
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      h1 {
        font-size: 16pt;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      h5 {
        margin-bottom: 1.5rem;
      }

      .address-item {
        display: flex;
        column-gap: 0.25rem;
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

      input[type="text"] {
        width: 100%;
        color: #0c395e;
        padding: 0.25rem;
        font-size: 14pt;
        font-family: "Roboto Condensed", sans-serif;
        resize: none;
        outline: solid 3px transparent;
      }

      input[type="text"]:focus {
        outline: solid 3px #688297;
        border-color: transparent;
      }
    }
  }
`;

export default ProjectView;
