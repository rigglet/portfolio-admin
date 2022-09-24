import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
import { HiLink } from "react-icons/hi";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";
import IconPicker from "../IconPicker";

const LinkAddViewEdit = function ({
  openingHookSetter,
  handleSaveLink,
  handleEditLink,
  title,
  currentLink,
  setCurrentLink,
  formType,
  fetchingData,
  allIcons,
}) {
  return (
    <StyledLinkAddViewEdit className="add-view-edit-modal">
      <div className="add-view-edit-modal-container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentLink}
          resetObject={{
            name: "",
            type: "",
            address: "",
            iconSearch: "",
            icon: "",
            color: "#313131", }}
        />

        <div className="title-header">
          <HiLink className="title-icon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentLink?._id}</h5>}
        </div>

        <div className="ave-modal-form-information">
          <div className="input-container">
            <label htmlFor="name">Link name:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="name"
              autoComplete="off"
              size="40"
              value={currentLink?.name}
              onChange={(e) =>
                setCurrentLink({
                  ...currentLink,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="type">Type:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="type"
              autoComplete="off"
              size="40"
              value={currentLink?.type}
              onChange={(e) =>
                setCurrentLink({
                  ...currentLink,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          
          <div className="input-container">
            <label htmlFor="address">Address:</label>
            <div className="address-input-container">
              <CgWebsite className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="address"
                autoComplete="off"
                size="50"
                value={currentLink?.address}
                onChange={(e) =>
                  setCurrentLink({
                    ...currentLink,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          
          <IconPicker
            formType={formType}
            currentObject={currentLink}
            setCurrentObject={setCurrentLink}
            allIcons={allIcons}
          />
          
        </div>

        {formType !== "VIEW" &&
          (fetchingData ? (
            <Spinner size="25px" alignment="flex-end" />
            ) : (
            <SubmitButton
              type={formType}
              editFunction={handleEditLink}
              saveFunction={handleSaveLink}
            />
          ))}
      </div>
    </StyledLinkAddViewEdit>
  );
};

const StyledLinkAddViewEdit = styled(motion.div)`


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

export default LinkAddViewEdit;
