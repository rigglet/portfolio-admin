import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//placeholder image
import placeholderImage from "../../images/organise_bg.svg";
//icons
import { BiArrowBack } from "react-icons/bi";
import { FaRegSave, FaFileUpload } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import SERVER_BASE_URL from "../../config/config";

const ImageAddViewEdit = function ({
  openingHookSetter,
  handleSaveImage,
  title,
  showSubmit,
  currentImage,
  setCurrentImage,
}) {
  const fileRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  //view or edit
  const imageURL = `${SERVER_BASE_URL()}/public/uploads/${
    currentImage?.fileName
  }`;

  //trigger open file input
  const fileClickHandler = () => {
    fileRef.current.click();
  };

  const handleChange = (e) =>
    setCurrentImage({
      ...currentImage,
      [e.target.name]: e.target.value,
    });

  return (
    <StyledImageAddViewEdit>
      <div className="container">
        <button
          className="close"
          onClick={() => {
            openingHookSetter(false);
            setCurrentImage({});
          }}
        >
          &#10008;
        </button>
        <h1>{title}</h1>
        <h5>{currentImage?._id}</h5>

        <div className="inner-container">
          <form onSubmit={handleSaveImage} encType="multipart/form-data">
            <div className="image-information">
              {currentImage.formType !== "NEW" ? (
                <img src={imageURL} alt={currentImage?.description} />
              ) : (
                <div
                  className={"project-box-edit"}
                  onClick={() => fileClickHandler()}
                >
                  <img
                    src={selectedFile ? selectedFile : placeholderImage}
                    alt="project"
                    className={"project-image-edit"}
                  />

                  <div className={"project-add-container "}>
                    <FaFileUpload className={"add-file-icon"} />
                    <p>Upload picture</p>
                  </div>

                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileRef}
                    name="projectFile"
                    onChange={() => {
                      setCurrentImage({
                        ...currentImage,
                        file: fileRef.current.files[0],
                      });
                      //preview file
                      setSelectedFile(
                        URL.createObjectURL(fileRef.current.files[0])
                      );
                    }}
                  />
                </div>
              )}
            </div>

            <div className="form-information">
              <div className="form">
                {currentImage?.category !== "profile" && (
                  <>
                    <div className="input-item">
                      <label htmlFor="name">Image name:</label>
                      <input
                        className={!showSubmit ? "disabled" : ""}
                        disabled={!showSubmit ? true : false}
                        type="text"
                        name="name"
                        value={currentImage?.name}
                        onChange={handleChange}
                        autoComplete="off"
                        size="40"
                      />
                    </div>
                    <div className="input-item">
                      <label htmlFor="description">Image description:</label>
                      <input
                        className={!showSubmit ? "disabled" : ""}
                        disabled={!showSubmit ? true : false}
                        type="text"
                        name="description"
                        value={currentImage?.description}
                        onChange={handleChange}
                        autoComplete="off"
                        size="40"
                      />
                    </div>
                  </>
                )}

                {currentImage.formType === "VIEW" && (
                  <>
                    <div className="input-item">
                      <label htmlFor="fileName">File name:</label>
                      <input
                        className={!showSubmit ? "disabled" : ""}
                        disabled={!showSubmit ? true : false}
                        type="text"
                        name="fileName"
                        value={currentImage?.fileName}
                        autoComplete="off"
                        size="40"
                      />
                    </div>

                    <div className="input-item">
                      <label htmlFor="category">Category:</label>
                      <input
                        className={!showSubmit ? "disabled" : ""}
                        disabled={!showSubmit ? true : false}
                        type="text"
                        name="category"
                        value={currentImage?.category}
                        autoComplete="off"
                        size="40"
                      />
                    </div>
                  </>
                )}
              </div>

              {currentImage.formType !== "VIEW" && (
                <div className="buttons">
                  <button
                    type="button"
                    onClick={() => {
                      openingHookSetter(false);
                      setCurrentImage({});
                    }}
                  >
                    <BiArrowBack />
                    Exit
                  </button>

                  <button type="submit">
                    <FaRegSave />
                    Save
                  </button>
                </div>
              )}
            </div>
          </form>
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

    .toolbar {
      position: absolute;
      top: 6rem;
      left: 2rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      .toolbarItem {
        column-gap: 0.5rem;
        display: flex;
        align-items: center;
        p {
          cursor: pointer;
        }
        .h-icon {
          cursor: pointer;
          width: 1.6rem;
          height: 1.6rem;
        }
      }
    }
    .inner-container {
      display: flex;
      height: 90%;

      form {
        display: flex;
        justify-items: flex-start;
        gap: 5rem;
        width: 100%;
        .image-information {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;

          img {
            border-radius: 10px;
            width: 100%;
            //height: auto;
            object-fit: contain;
            resize: both;
            //overflow: none;
          }

          .project-box-edit {
            background-color: hsl(0, 0%, 100%);
            border: dashed 3px #313131;
            outline-offset: 5px;
            z-index: 5;
            min-height: 400px;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 4px;
            //overflow: hidden;

            .project-add-container {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              row-gap: 0.25rem;

              .add-file-icon {
                pointer-events: none;
                z-index: 1;
                height: 50%;
                width: 50%;
              }
            }

            .project-image-edit {
              z-index: 2;
              width: 100%;
              max-height: 60vh;
              object-position: 50% 50%;
              object-fit: contain;
              resize: both;
              overflow: none;
              &:hover {
                transition: 1s ease;
                opacity: 0;
              }
            }

            input[type="file"] {
              display: none;
            }
          }
        }

        .form-information {
          //border: 1px solid blue;
          height: 100%;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .form {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;

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

            input {
              color: #0c395e;
              padding: 0.25rem;
              font-size: 14pt;
              font-family: "Roboto Condensed", sans-serif;
              resize: none;
              outline: solid 3px transparent;
            }
            input:focus {
              outline: solid 3px #688297;
              border-color: transparent;
              &.disabled {
                outline: solid 3px transparent;
                //background-color: red;
              }
            }
          }
          .buttons {
            display: flex;
            justify-content: space-between;
            width: 100%;
            column-gap: 1rem;

            button {
              display: flex;
              align-items: center;
              justify-content: center;
              column-gap: 1rem;
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

            button:hover {
              color: white;
              background-color: #0c395e;
              transition: 0.3s;
            }
          }
        }
      }
    }
  }
`;

export default ImageAddViewEdit;
