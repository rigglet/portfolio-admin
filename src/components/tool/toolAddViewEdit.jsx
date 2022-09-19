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

const ToolAddViewEdit = function ({
  openingHookSetter,
  handleSaveTool,
  handleEditTool,
  title,
  currentTool,
  setCurrentTool,
  formType,
  fetchingData,
}) {
  return (
    <StyledToolAddViewEdit>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentTool}
          resetObject={{
            name: "",
            //type: "",
            category: "",
            description: "",
            address: "",
            documentation: "",
            icon: "",
            color: "",
          }}
        />

        <div className="titleHeader">
          <FaTools className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentTool?._id}</h5>}
        </div>

        <div className="form-information">
          <div className="name-v">
            <div className="input-item">
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

            <div className="input-item">
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

            {/* <div className="input-item">
              <label htmlFor="type">Type:</label>
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="type"
                autoComplete="off"
                size="40"
                value={currentTool?.type}
                onChange={(e) =>
                  setCurrentTool({
                    ...currentTool,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div> */}

            <div className="input-item">
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
          </div>

          <div className="input-item">
            <label htmlFor="address">Address:</label>
            <div className="address-item">
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

          <div className="input-item">
            <label htmlFor="documentation">Documentation:</label>
            <div className="address-item">
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

          <div className="color-section">
            <div className="input-item">
              <label htmlFor="icon">Icon:</label>
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="icon"
                autoComplete="off"
                value={currentTool?.icon}
                onChange={(e) =>
                  setCurrentTool({
                    ...currentTool,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="color-item">
              <label htmlFor="color">Color:</label>
              <input
                disabled={formType === "VIEW" ? true : false}
                type="color"
                name="color"
                value={currentTool?.color}
                onChange={(e) =>
                  setCurrentTool({
                    ...currentTool,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

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
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 60vw;
    height: auto;
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
      row-gap: 1rem;

      .color-section {
        display: flex;
        column-gap: 1rem;
        align-items: center;
      }
      .address-item {
        display: flex;
        column-gap: 0.25rem;
        align-items: center;
        .address-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      .color-item {
        display: flex;
        flex-direction: column;
      }
      .input-item {
        width: 100%;
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
        resize: none;
        outline: solid 3px transparent;
        border-radius: 4px;
        padding: 0.25rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 10pt;
        border: 1px solid #313131;
      }

      input[type="text"]:focus {
        outline: solid 3px #688297;
        border-color: transparent;
      }
    }
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

export default ToolAddViewEdit;
