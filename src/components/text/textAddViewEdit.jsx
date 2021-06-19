//import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { IoText } from "react-icons/io5";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";

const TextAddViewEdit = function ({
  openingHookSetter,
  handleSaveText,
  handleEditText,
  title,
  currentText,
  setCurrentText,
  formType,
  fetchingData,
}) {
  return (
    <StyledTextAddViewEdit>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentText}
          resetObject={{
            name: "",
            content: "",
          }}
        />

        <div className="titleHeader">
          <IoText className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentText?._id}</h5>}
        </div>

        <div className="form-information">
          <div className="form-fields">
            <div className="input-item">
              <label htmlFor="name">Text name:</label>
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="name"
                autoComplete="off"
                size="40"
                value={currentText?.name}
                onChange={(e) =>
                  setCurrentText({
                    ...currentText,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <div className="input-item">
              <label htmlFor="content">Content:</label>
              <textarea
                disabled={formType === "VIEW" ? true : false}
                type="text"
                cols="100"
                rows="6"
                name="content"
                autoComplete="off"
                value={currentText?.content}
                onChange={(e) =>
                  setCurrentText({
                    ...currentText,
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
                editFunction={handleEditText}
                saveFunction={handleSaveText}
              />
            ))}
        </div>
      </div>
    </StyledTextAddViewEdit>
  );
};

const StyledTextAddViewEdit = styled(motion.div)`
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
      padding: 2rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

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
    }
  }
`;

export default TextAddViewEdit;
