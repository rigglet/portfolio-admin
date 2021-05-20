import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
import { FaTools } from "react-icons/fa";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";

const ToolAddViewEdit = function ({
  openingHookSetter,
  handleSaveTool,
  handleEditTool,
  title,
  currentTool,
  setCurrentTool,
  formType,
}) {
  return (
    <StyledToolAddViewEdit>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentTool}
          resetObject={{
            name: "",
            type: "",
            category: "",
            address: "",
          }}
        />

        <div className="titleHeader">
          <FaTools className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "NEW" && <h5>{currentTool?._id}</h5>}
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

            <div className="input-item">
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
            </div>
          </div>
          <div className="addresses">
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
          </div>

          {formType !== "VIEW" && (
            <SubmitButton
              type={formType}
              editFunction={handleEditTool}
              saveFunction={handleSaveTool}
            />
          )}
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
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 60vw;
    height: 60vh;
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
`;

export default ToolAddViewEdit;
