import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//placeholder image
import placeholderImage from "../../images/organise_bg.svg";
//icons
import { FaFileUpload } from "react-icons/fa";
import { ImImages } from "react-icons/im";
//messages
import "react-toastify/dist/ReactToastify.css";
//server base url
import SERVER_BASE_URL from "../../config/config";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";

const ImageAddViewEdit = function ({
  openingHookSetter,
  handleSaveImage,
  handleEditImage,
  title,
  currentImage,
  setCurrentImage,
  formType,
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
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentImage}
          resetObject={{ name: "", description: "", file: {} }}
        />

        <div className="titleHeader">
          <ImImages className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentImage?._id}</h5>}
        </div>

        <div className="inner-container">
          <form onSubmit={handleSaveImage} encType="multipart/form-data">
            <div className="image-information">
              {
                //VIEW /EDIT CONTAINER
                formType !== "ADD" ? (
                  <div className={"view-edit-image-container"}>
                    <img
                      src={imageURL}
                      alt={currentImage?.description}
                      className="view-edit-image-img"
                    />
                  </div>
                ) : (
                  //ADD IMAGE CONTAINER
                  <div
                    className={"add-image-container"}
                    onClick={() => fileClickHandler()}
                  >
                    <img
                      src={selectedFile ? selectedFile : placeholderImage}
                      alt="project"
                      className={"add-image-img"}
                    />

                    <div className={"add-file-container "}>
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
                )
              }
            </div>

            <div className="form-information">
              <div className="form">
                {currentImage?.category !== "profile" && (
                  <>
                    <div className="input-item">
                      <label htmlFor="name">Image name:</label>
                      <input
                        disabled={formType === "VIEW" ? true : false}
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
                        disabled={formType === "VIEW" ? true : false}
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

                {formType === "VIEW" && (
                  <>
                    <div className="input-item">
                      <label htmlFor="fileName">File name:</label>
                      <input
                        disabled={formType === "VIEW" ? true : false}
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
                        disabled={formType === "VIEW" ? true : false}
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

              {formType !== "VIEW" && (
                <div className="buttons">
                  <SubmitButton
                    type={formType}
                    editFunction={handleEditImage}
                    saveFunction={handleSaveImage}
                  />
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

  //"modal" popup
  .container {
    width: 80vw;
    height: 60vh;
    background-color: #ebebeb;
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    padding: 2rem;

    //image and form container
    .inner-container {
      display: flex;
      height: 90%;

      form {
        display: flex;
        justify-items: flex-start;
        gap: 5rem;
        width: 100%;

        //image div
        .image-information {
          width: 50%;
          height: 100%;
          display: flex;
          align-items: center;

          //add image container - dashed box
          .add-image-container {
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: hsl(0, 0%, 100%);
            border: dashed 3px #313131;
            position: relative;
            cursor: pointer;
            border-radius: 4px;
            width: 100%;
            height: 100%;
            padding: 0.5rem;

            //new image <img />
            .add-image-img {
              z-index: 2;
              max-width: 100%;
              max-height: 100%;
              object-position: 50% 50%;
              object-fit: scale-down;
              overflow: none;
              transition: 0.5s ease;
              &:hover {
                transition: 1s ease;
                opacity: 0;
              }
            }

            .add-file-container {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              row-gap: 0.5rem;

              .add-file-icon {
                pointer-events: none;
                z-index: 1;
                height: 33%;
                width: 33%;
              }
            }

            input[type="file"] {
              display: none;
            }
          }

          //view / edit image container
          .view-edit-image-container {
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            border: solid 1px #313131;
            border-radius: 4px;
            cursor: default;
            width: 100%;
            height: 100%;
            padding: 0.5rem;

            .view-edit-image-img {
              z-index: 2;
              max-width: 100%;
              max-height: 100%;
              object-position: 50% 50%;
              object-fit: scale-down;
              overflow: none;
            }
          }
        }

        //form text field container
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
            input:focus {
              outline: solid 3px #688297;
              border-color: transparent;
            }
          }

          .buttons {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            column-gap: 1rem;
          }
        }
      }
    }
  }
`;

export default ImageAddViewEdit;
