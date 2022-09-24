import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";
import IconPicker from "../IconPicker";

const ToolAddViewEdit = function ({
  openingHookSetter,
  handleSaveTool,
  handleEditTool,
  title,
  currentTool,
  setCurrentTool,
  formType,
  fetchingData,
  allIcons,
}) {
  return (
    <StyledToolAddViewEdit className="add-view-edit-modal">
      <div className="add-view-edit-modal-container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentTool}
          resetObject={{
            name: "",
            category: "",
            description: "",
            address: "",
            documentation: "",
            iconSearch: "",
            icon: "",
            color: "#313131",
          }}
        />

        <div className="title-header">
          <FaTools className="title-icon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentTool?._id}</h5>}
        </div>

        <div className="ave-modal-form-information">
          
          <div className="input-container">
            <label htmlFor="name">Tool name:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="name"
              autoComplete="off"
              size="40"
              value={currentTool?.name}
              onChange={(e) =>
                setCurrentTool({
                  ...currentTool,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="category">Category:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="category"
              autoComplete="off"
              size="40"
              value={currentTool?.category}
              onChange={(e) =>
                setCurrentTool({
                  ...currentTool,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="input-container">
            <label htmlFor="type">Description:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="description"
              autoComplete="off"
              size="40"
              value={currentTool?.description}
              onChange={(e) =>
                setCurrentTool({
                  ...currentTool,
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
                value={currentTool?.address}
                onChange={(e) =>
                  setCurrentTool({
                    ...currentTool,
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
                value={currentTool?.documentation}
                onChange={(e) =>
                  setCurrentTool({
                    ...currentTool,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <IconPicker
            formType={formType}
            currentObject={currentTool}
            setCurrentObject={setCurrentTool}
            allIcons={allIcons}
          />

          {formType !== "VIEW" &&
            (fetchingData ? (
              <Spinner size="25px" alignment="flex-end" />
            ) : (
              <SubmitButton
                type={formType}
                editFunction={handleEditTool}
                saveFunction={handleSaveTool}
              />
            ))}
        </div>
      </div>
    </StyledToolAddViewEdit>
  );
};

const StyledToolAddViewEdit = styled(motion.div)`  
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

export default ToolAddViewEdit;
