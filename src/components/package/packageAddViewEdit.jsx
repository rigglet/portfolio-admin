import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaGithub, FaBook } from "react-icons/fa";
import { CgWebsite, CgNpm } from "react-icons/cg";
import { GoPackage } from "react-icons/go";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";
import IconPicker from "../IconPicker";

const PackageAddViewEdit = function ({
  openingHookSetter,
  handleSavePackage,
  handleEditPackage,
  title,
  currentPackage,
  setCurrentPackage,
  formType,
  fetchingData,
  allIcons,
}) {
  return (
    <StyledPackageAddViewEdit className="add-view-edit-modal">
      <div className="add-view-edit-modal-container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentPackage}
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
          <GoPackage className="title-icon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentPackage?._id}</h5>}
        </div>

        <div className="ave-modal-form-information">
          <div className="nvb">
            <div className="name-version">
              <div className="input-container">
                <label htmlFor="name">Package name:</label>
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="name"
                  autoComplete="off"
                  value={currentPackage?.name}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
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
                  //size="40"
                  value={currentPackage?.version}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
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
                  value={currentPackage?.description}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            
          <IconPicker
            formType={formType}
            currentObject={currentPackage}
            setCurrentObject={setCurrentPackage}
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
                  value={currentPackage?.npmaddress}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
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
                  value={currentPackage?.githubrepo}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
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
                  value={currentPackage?.homepage}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
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
                  value={currentPackage?.documentation}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
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
                editFunction={handleEditPackage}
                saveFunction={handleSavePackage}
              />
            ))}
        </div>
      </div>
    </StyledPackageAddViewEdit>
  );
};

const StyledPackageAddViewEdit = styled(motion.div)`
  .nvb {
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

export default PackageAddViewEdit;
