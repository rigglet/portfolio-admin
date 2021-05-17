//import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
//components
import SubmitButton from "../submitButton";

const TechAddViewEdit = function ({
  openingHookSetter,
  handleSaveTech,
  handleEditTech,
  title,
  currentTech,
  setCurrentTech,
  formType,
}) {
  return (
    <StyledTechAddViewEdit>
      <div className="container">
        <button
          className="close"
          onClick={() => {
            openingHookSetter(false);
            setCurrentTech({
              name: "",
              type: "",
              address: "",
            });
          }}
        >
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentTech?._id}</h5>

          <div className="input-item">
            <label htmlFor="name">Technology name:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="name"
              autoComplete="off"
              size="40"
              value={currentTech?.name}
              onChange={(e) =>
                setCurrentTech({
                  ...currentTech,
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
              size="50"
              value={currentTech?.type}
              onChange={(e) =>
                setCurrentTech({
                  ...currentTech,
                  [e.target.name]: e.target.value,
                })
              }
            />
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
                //size="50"
                value={currentTech?.address}
                onChange={(e) =>
                  setCurrentTech({
                    ...currentTech,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {formType !== "VIEW" && (
            <SubmitButton
              type={formType}
              editFunction={handleEditTech}
              saveFunction={handleSaveTech}
            />
          )}
        </div>
      </div>
    </StyledTechAddViewEdit>
  );
};

const StyledTechAddViewEdit = styled(motion.div)`
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
      height: 100%;
      width: 100%;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

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

      input[type="text"] {
        width: 100%;
        color: #0c395e;
        padding: 0.25rem;
        font-size: 14pt;
        font-family: "Roboto Condensed", sans-serif;
        resize: none;
        outline: solid 3px transparent;
      }

      input[type="text"]:focus {
        outline: solid 3px #688297;
        border-color: transparent;
        &.disabled {
          outline: solid 3px transparent;
          background-color: red;
        }
      }
    }
  }
`;

export default TechAddViewEdit;
