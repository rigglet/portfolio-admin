//import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//forms
import { useForm } from "react-hook-form";

const TextAddViewEdit = function ({
  openingHookSetter,
  handleSaveText,
  title,
  showSubmit,
  currentText,
  formType,
}) {
  const { register, handleSubmit } = useForm();

  return (
    <StyledTextAddViewEdit>
      <div className="container">
        <button className="close" onClick={() => openingHookSetter(false)}>
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentText?._id}</h5>
          <form onSubmit={handleSubmit(handleSaveText)}>
            <input
              type="hidden"
              {...register("formtype")}
              autoComplete="off"
              size="40"
              defaultValue={formType}
            />
            <input
              type="hidden"
              {...register("_id")}
              autoComplete="off"
              size="40"
              defaultValue={currentText?._id}
            />
            <div className="form-fields">
              <div className="input-item">
                <label htmlFor="name">Text name:</label>
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  type="text"
                  {...register("name")}
                  autoComplete="off"
                  size="40"
                  defaultValue={currentText?.name}
                />
              </div>

              <div className="input-item">
                <label htmlFor="content">Content:</label>
                <textarea
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  type="text"
                  cols="100"
                  rows="10"
                  {...register("content")}
                  autoComplete="off"
                  defaultValue={currentText?.content}
                />
              </div>
            </div>

            {showSubmit ? <button type="submit">Submit</button> : ""}
          </form>
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
    width: 80vw;
    height: 80vh;
    background-color: #ebebeb;
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;

    .form-information {
      height: 85%;
      width: 100%;
      padding: 2rem;
      h1 {
        font-size: 16pt;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      h5 {
        margin-bottom: 1.5rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
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

        textarea {
          overflow-y: scroll;
        }
        input,
        textarea {
          color: #0c395e;
          padding: 0.25rem;
          font-size: 14pt;
          font-family: "Roboto Condensed", sans-serif;
          resize: none;
          outline: solid 3px transparent;
        }
        input:focus,
        textarea:focus {
          outline: solid 3px #688297;
          border-color: transparent;
          &.disabled {
            outline: solid 3px transparent;
            background-color: red;
          }
        }
        button[type="submit"] {
          color: #0c395e;
          border: 2px solid #0c395e;
          padding: 0.25rem;
          font-size: 14pt;
          font-variant-caps: all-small-caps;
          outline: solid 3px transparent;
          width: 100px;
          height: 40px;
          cursor: pointer;
          align-self: flex-end;
        }
        button[type="submit"]:hover {
          color: white;
          background-color: #0c395e;
          transition: 0.3s;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;

export default TextAddViewEdit;
