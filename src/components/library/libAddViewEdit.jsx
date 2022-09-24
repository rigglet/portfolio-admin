import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaGithub, FaBook } from "react-icons/fa";
import { CgWebsite, CgNpm } from "react-icons/cg";
import { IoLibraryOutline } from "react-icons/io5";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";
import IconPicker from "../IconPicker";

const LibAddViewEdit = function ({
  openingHookSetter,
  handleSaveLib,
  handleEditLib,
  title,
  currentLib,
  setCurrentLib,
  formType,
  fetchingData,
  allIcons,
}) {

  return (
    <StyledLibAddViewEdit className="add-view-edit-modal">
      <div className="add-view-edit-modal-container">
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
            documentation: "",
            iconSearch: "",
            icon: "",
            color: "#313131",
          }}
        />

        <div className="title-header">
          <IoLibraryOutline className="title-icon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentLib?._id}</h5>}
        </div>

        <div className="ave-modal-form-information">
          <div className="name-version-description-container">
            <div className="name-version">
              <div className="input-container">
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

              <div className="input-container">
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

              <div className="input-container">
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
          

              <IconPicker
                formType={formType}
                currentObject={currentLib}
                setCurrentObject={setCurrentLib}
                allIcons={allIcons}
              />
          </div>

          <div className="addresses">
            <div className="input-container">
              <label htmlFor="npmaddress">NPM Address:</label>
              <div className="address-input-container">
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
            <div className="input-container">
              <label htmlFor="githubrepo">Github Respository:</label>
              <div className="address-input-container">
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

            <div className="input-container">
              <label htmlFor="homepage">Homepage:</label>
              <div className="address-input-container">
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

            <div className="input-container">
              <label htmlFor="documentation">Documentation:</label>
              <div className="address-input-container">
                <FaBook className="address-icon" />
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="documentation"
                  autoComplete="off"
                  value={currentLib?.documentation}
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

          {formType !== "VIEW" &&
            (fetchingData ? (
              <Spinner size="25px" alignment="flex-end" />
            ) : (
              <SubmitButton
                type={formType}
                editFunction={handleEditLib}
                saveFunction={handleSaveLib}
              />
            ))}
        </div>
      </div>
    </StyledLibAddViewEdit>
  );
};

const StyledLibAddViewEdit = styled(motion.div)`
  //containers to control layout
  .name-version-description-container {
    display: flex;
    width: 100%;
    column-gap: 1rem;
    justify-content: space-evenly;
    align-items: space-evenly;
  }
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

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    top: 0vh;
    left: 0vw;

    .container {
      width: 90vw;
      height: auto;
      padding: 1rem;
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    top: 0vh;
    left: 0vw;
    align-items: flex-start;

    .container {
      width: 90vw;
      height: auto;
      padding: 1rem;
    }
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

export default LibAddViewEdit;
