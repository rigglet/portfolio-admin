import { useState, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//images
import profile from "../images/profile.svg";
//icons
import { BiArrowBack } from "react-icons/bi";
import { FaEdit, FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//data
import { updateUser } from "../api/api";
//server URL
import SERVER_BASE_URL from "../config/config";
//components
import SubmitButton from "./submitButton";
import CloseButton from "./closeButton";

function Profile({
  auth,
  setAuth,
  openingHookSetter,
  selectedFile,
  setSelectedFile,
  title,
  formType,
}) {
  const baseURL = `${SERVER_BASE_URL}/public/uploads/`;
  const fileRef = useRef(null);
  const [profile, setProfile] = useState({ username: `${auth.username}` });
  const [clearingImage, setClearingImage] = useState(false);
  const [editing, setEditing] = useState(false);

  const profileImageUrl = auth.profileImageUrl?.fileName || null;

  const notify = (type) => {
    switch (type) {
      case "SERVER_ERR":
        toast.warning(`Internal Server error: Profile not saved.`);
        break;
      case "EDITED":
        toast.dark(`Profile SAVED`);
        break;
      case "ADDED":
        toast.dark(`Profile image ADDED successfully`);
        break;
      case "NOIMAGE":
        toast.dark(`Please select a profile image!`);
        break;
      case "DELETED":
        toast.dark(`Profile image DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //trigger open file input
  const fileClickHandler = () => {
    fileRef.current.click();
  };

  //remove selected image - not permanent unless saved
  const clearImage = () => {
    console.log("Clear Image");
    setSelectedFile(null);
    setClearingImage(true);
  };

  //restore profile image
  const restoreOriginal = () => {
    fileRef.current.value = null;

    if (profileImageUrl !== null) {
      setSelectedFile(`${baseURL}${profileImageUrl}`);
    } else {
      setSelectedFile(null);
    }
    setClearingImage(false);
  };

  //HANDLE SAVE PROFILE
  const handleSaveProfile = (data) => {
    const formData = new FormData();
    //by default update name only
    let option = "NAME"; //OPTIONS: CLEAR / NEW / NAME

    const editUser = async () => {
      const updatedProfile = await updateUser(auth, formData, option);
      return updatedProfile;
    };

    //append username
    formData.append("username", data.username);
    formData.append("category", "profile");

    //if (!clearingImage) {
    //check if an image has been selected
    if (
      fileRef.current.files[0] !== undefined &&
      fileRef.current.files[0] !== null &&
      fileRef.current.value !== undefined
    ) {
      //if so append to form data
      formData.append(
        "profileImage",
        fileRef.current.files[0],
        fileRef.current.files[0].name
      );
      option = "NEW";
    } else {
      if (clearingImage) {
        console.log("No file selected - clearing image");
        option = "CLEAR";
        //clearing image so set to null
        formData.append("profileImage", null);
      } else {
        notify("NOIMAGE");
        return;
      }
    }

    editUser()
      .then((result) => {
        if (result.status === 200) {
          //console.log("result: ", result);
          //Toast message
          notify("EDITED");
        } else {
          notify("SERVER_ERR");
          //throw new Error("Server ERROR");
        }
        return result;
      })
      .then((result) => {
        //setAuth triggers a rerender so no need to setShowProfile
        //console.log("result: ", result);
        setAuth({
          ...auth,
          profileImageUrl: result.data.profileImageUrl || null,
          username: result.data.username,
        });
      });
  };

  return (
    <StyledProfile>
      <ToastContainer
        closeButton={false}
        transition={Zoom}
        position="bottom-center"
        draggable={false}
        pauseOnHover
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />

      <div className="container">
        <div className="toolbar">
          {formType === "EDIT" && (
            <>
              <div className="toolbarItem" onClick={() => clearImage()}>
                <MdDelete className="h-icon" />
                <p>Remove profile picture</p>
              </div>
              <div className="toolbarItem" onClick={() => restoreOriginal()}>
                <GrPowerReset className="h-icon" />
                <p>Reset profile picture</p>
              </div>
            </>
          )}
        </div>

        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setProfile}
          resetObject={{ username: `${auth.username}` }}
        />

        <div className="titleHeader">
          <CgProfile className="titleIcon" />
          <h1>{title} </h1>
        </div>

        {formType === "VIEW" && (
          <div className="profile-view-container">
            <div className="profile-img-container">
              <img
                src={selectedFile ? selectedFile : profile}
                alt="profile"
                className="selected-profile-image"
              />
            </div>
            <h4>{auth.username}</h4>
          </div>
        )}

        <div className="form-information">
          {formType !== "VIEW" && (
            <form>
              <>
                <div
                  className={
                    formType === "EDIT"
                      ? "profile-box-edit profile-box-active"
                      : "profile-box-edit profile-box-inactive"
                  }
                  onClick={() => fileClickHandler()}
                >
                  {/*uploaded profile image*/}
                  <img
                    src={selectedFile ? selectedFile : profile}
                    alt="profile"
                    className={
                      formType === "EDIT"
                        ? "profile-image-edit"
                        : "profile-image-show"
                    }
                  />

                  {/*upload icon */}
                  <div
                    className={
                      formType === "EDIT"
                        ? "profile-add-container showFileIcon"
                        : "profile-add-container hideFileIcon"
                    }
                  >
                    <FaFileUpload className={"add-file-icon"} />
                    <p>Upload picture</p>
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    name="profileFile"
                    ref={fileRef}
                    onChange={() => {
                      if (fileRef.current.files[0] !== undefined) {
                        setSelectedFile(
                          URL.createObjectURL(fileRef.current.files[0])
                        );
                      }
                    }}
                  />
                </div>
              </>

              <div className="input-item">
                {formType === "EDIT" && (
                  <label htmlFor="username">Username:</label>
                )}
                <input
                  className={formType === "EDIT" ? "editing" : ""}
                  disabled={formType === "EDIT" ? false : true}
                  type="text"
                  name="username"
                  autoComplete="off"
                  size="40"
                />
              </div>

              <div className="buttons">
                {formType === "EDIT" && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(!editing);
                      if (profileImageUrl !== null) {
                        setSelectedFile(`${baseURL}${profileImageUrl}`);
                      } else {
                        setSelectedFile(null);
                      }
                    }}
                  >
                    <BiArrowBack />
                    Exit
                  </button>
                )}
                {formType === "EDIT" && (
                  <SubmitButton
                    type={formType}
                    editFunction={handleSaveProfile}
                    saveFunction={handleSaveProfile}
                  />
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </StyledProfile>
  );
}

const StyledProfile = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 60vw;
    height: 70vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    padding: 2rem;
    box-shadow: 0 0 20px 10px #689ed0;

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

    .profile-view-container {
      height: 90%;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      align-items: center;
      justify-content: center;
      .profile-img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20em;
        height: 20em;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 20px 10px #689ed0;
        object-position: 50% 50%;
        object-fit: cover;

        .selected-profile-image {
          width: auto;
          height: 20em;
        }
      }
      h4 {
        color: #0c395e;
        font-size: 24pt;
        text-align: center;
        font-family: "Lobster Two", cursive;
      }
    }

    .form-information {
      height: 90%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      //border: 1px solid red;

      form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        height: 100%;

        .profile-box-active {
          border: dashed 3px #313131;
          outline-offset: 5px;
        }
        .profile-box-inactive {
          pointer-events: none;
          box-shadow: 0 0 5px 5px #688297;
          border: none;
        }
        .profile-box-edit {
          z-index: 5;
          min-height: 250px;
          width: 250px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          border-radius: 50%;
          overflow: hidden;

          .showFileIcon {
            display: flex;
          }
          .hideFileIcon {
            display: none;
          }
          .profile-add-container {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            //display: flex;
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
          .profile-image-edit {
            z-index: 2;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 50%;
            //using overflow:hidden on container for better support
            //clip-path: circle(125px at center);
            &:hover {
              transition: 1s ease;
              opacity: 0;
            }
          }
          h4 {
            color: #0c395e;
          }
          input[type="file"] {
            display: none;
          }
        }
      }

      input[type="text"] {
        color: #0c395e;
        padding: 0.25rem;
        font-size: 24pt;
        text-align: center;
        font-family: "Lobster Two", cursive;
        outline: solid 3px transparent;
        border: solid 1px transparent;
        background-color: #ebebeb;
        &:focus {
          outline: solid 3px #688297;
        }
        &.editing {
          border: dashed 3px #313131;
          border-radius: 4px;
        }
        &:focus.editing {
          border: solid 1px transparent;
        }
      }

      .input-item {
        display: flex;
        flex-direction: column;
        width: 60%;
        label {
          font-weight: bold;
          font-size: 14pt;
          font-variant-caps: all-small-caps;
          margin-bottom: 0.5rem;
        }
      }

      .buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
        column-gap: 1rem;
        button {
          display: flex;
          column-gap: 1rem;
          align-items: center;
          justify-content: center;
          color: #0c395e;
          border: 2px solid #0c395e;
          padding: 0.25rem;
          font-size: 14pt;
          font-variant-caps: all-small-caps;
          outline: solid 3px transparent;
          width: 100px;
          height: 40px;
          cursor: pointer;
        }
        button:hover {
          color: white;
          background-color: #0c395e;
          transition: 0.3s;
        }
      }
    }
  }
`;

export default Profile;
