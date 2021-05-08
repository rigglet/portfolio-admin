//import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaGithub } from "react-icons/fa";
import { CgWebsite, CgNpm } from "react-icons/cg";
//forms
import { useForm } from "react-hook-form";
//import { postData } from "../../api/api";

const LibAddViewEdit = function ({
  openingHookSetter,
  handleSaveLib,
  title,
  showSubmit,
  currentLib,
  formType,
}) {
  const { register, handleSubmit } = useForm();

  return (
    <StyledLibAddViewEdit>
      <div className="container">
        <button className="close" onClick={() => openingHookSetter(false)}>
          &#10008;
        </button>
        <div className="form-information">
          <h1>{title}</h1>
          <h5>{currentLib?._id}</h5>
          <form onSubmit={handleSubmit(handleSaveLib)}>
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
              defaultValue={currentLib?._id}
            />
            <div className="name-v">
              <div className="input-item">
                <label htmlFor="name">Library name:</label>
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  type="text"
                  {...register("name")}
                  autoComplete="off"
                  size="40"
                  defaultValue={currentLib?.name}
                />
              </div>

              <div className="input-item">
                <label htmlFor="version">Version:</label>
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  type="text"
                  {...register("version")}
                  autoComplete="off"
                  size="40"
                  defaultValue={currentLib?.version}
                />
              </div>
            </div>
            <div className="addresses">
              <div className="input-item">
                <label htmlFor="npmaddress">NPM Address:</label>
                <div className="address-item">
                  <CgNpm className="address-icon" />
                  <input
                    className={!showSubmit ? "disabled" : ""}
                    disabled={!showSubmit ? true : false}
                    type="text"
                    {...register("npmaddress")}
                    autoComplete="off"
                    size="50"
                    defaultValue={currentLib?.npmaddress}
                  />
                </div>
              </div>
              <div className="input-item">
                <label htmlFor="githubrepo">Github Respository:</label>
                <div className="address-item">
                  <FaGithub className="address-icon" />
                  <input
                    className={!showSubmit ? "disabled" : ""}
                    disabled={!showSubmit ? true : false}
                    type="text"
                    {...register("githubrepo")}
                    autoComplete="off"
                    size="50"
                    defaultValue={currentLib?.githubrepo}
                  />
                </div>
              </div>
              <div className="input-item">
                <label htmlFor="homepage">Homepage:</label>
                <div className="address-item">
                  <CgWebsite className="address-icon" />
                  <input
                    className={!showSubmit ? "disabled" : ""}
                    disabled={!showSubmit ? true : false}
                    type="text"
                    {...register("homepage")}
                    autoComplete="off"
                    size="50"
                    defaultValue={currentLib?.homepage}
                  />
                </div>
              </div>
            </div>
            <div className="input-item">
              <label htmlFor="description">Description:</label>
              <textarea
                className={!showSubmit ? "disabled" : ""}
                disabled={!showSubmit ? true : false}
                type="text"
                {...register("description")}
                autoComplete="off"
                cols="50"
                rows="4"
                defaultValue={currentLib?.description}
              />
            </div>
            {showSubmit ? <button type="submit">Submit</button> : ""}
          </form>
        </div>
      </div>
    </StyledLibAddViewEdit>
  );
};

const StyledLibAddViewEdit = styled(motion.div)`
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

        .name-v,
        .addresses {
          display: flex;
          column-gap: 5rem;
          row-gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;

export default LibAddViewEdit;
