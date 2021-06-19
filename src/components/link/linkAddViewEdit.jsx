import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
import { HiLink } from "react-icons/hi";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";

const LinkAddViewEdit = function ({
  openingHookSetter,
  handleSaveLink,
  handleEditLink,
  title,
  currentLink,
  setCurrentLink,
  formType,
  fetchingData,
}) {
  return (
    <StyledLinkAddViewEdit>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentLink}
          resetObject={{ name: "", type: "", address: "" }}
        />

        <div className="titleHeader">
          <HiLink className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentLink?._id}</h5>}
        </div>

        <div className="form-information">
          <div className="name-v">
            <div className="input-item">
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

            <div className="input-item">
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
            <div className="input-item">
              <label htmlFor="icon">Icon:</label>
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="icon"
                autoComplete="off"
                size="50"
                value={currentLink?.icon}
                onChange={(e) =>
                  setCurrentLink({
                    ...currentLink,
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
      </div>
    </StyledLinkAddViewEdit>
  );
};

const StyledLinkAddViewEdit = styled(motion.div)`
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
          width: 1.5rem;
          height: 1.5rem;
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

export default LinkAddViewEdit;
