//import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
//forms
import { useForm } from "react-hook-form";

const ImageAddViewEdit = function ({
  openingHookSetter,
  handleSaveImage,
  title,
  showSubmit,
  currentImage,
  formType,
}) {
  const { register, handleSubmit } = useForm();

  const baseUrl = "http://localhost:8081/public/uploads/";
  const imageURL = `${baseUrl}${currentImage.fileName}`;

  console.log(currentImage);

  return (
    <StyledImageAddViewEdit>
      <div className="container">
        <button className="close" onClick={() => openingHookSetter(false)}>
          &#10008;
        </button>
        <h1>{title}</h1>
        <h5>{currentImage?._id}</h5>
        <div className="inner-container">
          <div className="image-information">
            <img src={imageURL} alt={currentImage.imageDescription} />
          </div>
          <div className="form-information">
            <form onSubmit={handleSubmit(handleSaveImage)}>
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
                defaultValue={currentImage?._id}
              />

              {currentImage.category === "project" && (
                <>
                  <div className="input-item">
                    <label htmlFor="imageName">Image name:</label>
                    <input
                      className={!showSubmit ? "disabled" : ""}
                      disabled={!showSubmit ? true : false}
                      type="text"
                      {...register("imageName")}
                      autoComplete="off"
                      size="40"
                      defaultValue={currentImage?.name}
                    />
                  </div>
                  <div className="input-item">
                    <label htmlFor="imageDescription">Image description:</label>
                    <input
                      className={!showSubmit ? "disabled" : ""}
                      disabled={!showSubmit ? true : false}
                      type="text"
                      {...register("imageDescription")}
                      autoComplete="off"
                      size="40"
                      defaultValue={currentImage?.name}
                    />
                  </div>
                </>
              )}
              <div className="input-item">
                <label htmlFor="fileName">File name:</label>
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  type="text"
                  {...register("fileName")}
                  autoComplete="off"
                  size="40"
                  defaultValue={currentImage?.fileName}
                />
              </div>

              <div className="input-item">
                <label htmlFor="type">Category:</label>
                <input
                  className={!showSubmit ? "disabled" : ""}
                  disabled={!showSubmit ? true : false}
                  type="text"
                  {...register("category")}
                  autoComplete="off"
                  size="40"
                  defaultValue={currentImage?.category}
                />
              </div>

              {showSubmit ? <button type="submit">Submit</button> : ""}
            </form>
          </div>
        </div>
      </div>
    </StyledImageAddViewEdit>
  );
};

const StyledImageAddViewEdit = styled(motion.div)`
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
    padding: 3rem;

    h1 {
      font-size: 16pt;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    h5 {
      margin-bottom: 1.5rem;
    }
    .inner-container {
      display: flex;
      column-gap: 1rem;
      //height: 100%;
      .image-information {
        width: 50%;
        height: 100%;
        img {
          border-radius: 4px;
          width: 100%;
          height: 100%;
        }
      }
      .form-information {
        height: 100%;
        width: 50%;

        form {
          display: flex;
          flex-direction: column;
          justify-items: flex-start;
          gap: 1rem;
          .input-item {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
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
  }
`;

export default ImageAddViewEdit;
