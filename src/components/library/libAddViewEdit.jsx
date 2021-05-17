import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaGithub } from "react-icons/fa";
import { CgWebsite, CgNpm } from "react-icons/cg";
//components
import SubmitButton from "../submitButton";

const LibAddViewEdit = function ({
  openingHookSetter,
  handleSaveLib,
  handleEditLib,
  title,
  currentLib,
  setCurrentLib,
  formType,
}) {
  return (
    <StyledLibAddViewEdit>
      <div className="container">
        <button
          className="close"
          onClick={() => {
            openingHookSetter(false);
            setCurrentLib({
              name: "",
              version: "",
              description: "",
              npmaddress: "",
              githubrepo: "",
              homepage: "",
            });
          }}
        >
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentLib?._id}</h5>
          <div className="nvb">
            <div className="name-version">
              <div className="input-item">
                <label htmlFor="name">Library name:</label>
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={currentLib?.name}
                  onChange={(e) =>
                    setCurrentLib({
                      ...currentLib,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-item">
                <label htmlFor="version">Version:</label>
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="version"
                  autoComplete="off"
                  value={currentLib?.version}
                  onChange={(e) =>
                    setCurrentLib({
                      ...currentLib,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="description">
              <div className="input-item">
                <label htmlFor="description">Description:</label>
                <textarea
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="description"
                  autoComplete="off"
                  cols="50"
                  rows="4"
                  value={currentLib?.description}
                  onChange={(e) =>
                    setCurrentLib({
                      ...currentLib,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="addresses">
            <div className="input-item">
              <label htmlFor="npmaddress">NPM Address:</label>
              <div className="address-item">
                <CgNpm className="address-icon" />
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="npmaddress"
                  autoComplete="off"
                  size="50"
                  value={currentLib?.npmaddress}
                  onChange={(e) =>
                    setCurrentLib({
                      ...currentLib,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="githubrepo">Github Respository:</label>
              <div className="address-item">
                <FaGithub className="address-icon" />
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="githubrepo"
                  autoComplete="off"
                  size="50"
                  value={currentLib?.githubrepo}
                  onChange={(e) =>
                    setCurrentLib({
                      ...currentLib,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="homepage">Homepage:</label>
              <div className="address-item">
                <CgWebsite className="address-icon" />
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="homepage"
                  autoComplete="off"
                  size="50"
                  value={currentLib?.homepage}
                  onChange={(e) =>
                    setCurrentLib({
                      ...currentLib,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          {formType !== "VIEW" && (
            <SubmitButton
              type={formType}
              editFunction={handleEditLib}
              saveFunction={handleSaveLib}
            />
          )}
        </div>
      </div>
    </StyledLibAddViewEdit>
  );
};

const StyledLibAddViewEdit = styled(motion.div)`
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
      height: 85%;
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      row-gap: 2rem;

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

      input[type="text"],
      textarea {
        width: 100%;
        color: #0c395e;
        padding: 0.25rem;
        font-size: 14pt;
        font-family: "Roboto Condensed", sans-serif;
        resize: none;
        outline: solid 3px transparent;
      }
      input[type="text"]:focus,
      textarea:focus {
        outline: solid 3px #688297;
        border-color: transparent;
      }
      .nvb {
        display: flex;
        width: 100%;
        column-gap: 1rem;
        justify-content: space-evenly;
        align-items: space-evenly;
      }
      .description,
      .name-version {
        width: 40%;
        display: flex;
        flex-direction: column;
      }
      .addresses {
        display: flex;
        column-gap: 3rem;
        row-gap: 1rem;
        //flex-wrap: wrap;
        align-items: center;
        justify-content: space-evenly;
      }
    }
  }
`;

export default LibAddViewEdit;
