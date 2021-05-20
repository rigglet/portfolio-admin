import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaGithub } from "react-icons/fa";
import { CgWebsite, CgNpm } from "react-icons/cg";
import { IoLibraryOutline } from "react-icons/io5";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";

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
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentLib}
          resetObject={{
            name: "",
            version: "",
            description: "",
            npmaddress: "",
            githubrepo: "",
            homepage: "",
          }}
        />

        <div className="titleHeader">
          <IoLibraryOutline className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "NEW" && <h5>{currentLib?._id}</h5>}
        </div>

        <div className="form-information">
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
    width: 60vw;
    height: 80vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    padding: 2rem;

    .form-information {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 2rem;

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
        resize: none;
        outline: solid 3px transparent;
        border-radius: 4px;
        padding: 0.25rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 10pt;
        border: 1px solid #313131;
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
        flex-direction: column;
        row-gap: 1rem;
      }
    }
  }
`;

export default LibAddViewEdit;
