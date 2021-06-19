import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//images
import defaultProfile from "../images/profile.svg";
//icons
import { FaFileUpload } from "react-icons/fa";
import { MdDelete, MdRestore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//data
import { updateUser } from "../api/api";
//server URL
import { baseURL as SERVER_BASE_URL, imagePath } from "../config/config";
//components
import SubmitButton from "./submitButton";
import CloseButton from "./closeButton";

function Profile({ auth, setAuth, openingHookSetter, title, formType }) {
  const fileRef = useRef(null);
  const uploadsBaseURL = `${SERVER_BASE_URL()}/${imagePath()}/`;
  //defaultProfile = profile SVG

  //used by profile VIEW
  const savedFilename = auth.profileImageUrl?.fileName || null;

  //used to hold value of current profile pic if there is one, else defaultProfile
  //file selected from file input
  //defaultProfile if image is cleared
  const [previewImage, setPreviewImage] = useState(savedFilename);

  useEffect(() => {
    if (savedFilename !== null) {
      setPreviewImage(`${uploadsBaseURL}${savedFilename}`);
    } else {
      setPreviewImage(null);
    }
  }, [uploadsBaseURL, savedFilename]);

  //profile data used to hold
  const [profileData, setProfileData] = useState({
    username: auth.username,
    filename: auth.profileImageUrl?.fileName,
  });

  useEffect(() => {
    if (profileData.file !== undefined) {
      setPreviewImage(URL.createObjectURL(profileData.file));
    }
  }, [profileData]);

  const [clearingImage, setClearingImage] = useState(false);

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
    setProfileData({
      username: auth.username,
      filename: null,
    });
    setPreviewImage(defaultProfile);
    setClearingImage(true);
  };

  //restore profile image
  const restoreOriginal = () => {
    fileRef.current.value = null;
    setProfileData({
      username: auth.username,
      filename: savedFilename,
      file: undefined,
    });

    if (savedFilename !== null) {
      setPreviewImage(`${uploadsBaseURL}${savedFilename}`);
    } else {
      setPreviewImage(defaultProfile);
    }
    setClearingImage(false);
  };

  //HANDLE SAVE PROFILE
  const handleSaveProfile = () => {
    const formData = new FormData();
    //by default update name only
    let option = "NAME"; //OPTIONS: CLEAR / NEW / NAME

    const editUser = async () => {
      const updatedProfile = await updateUser(auth, formData, option);
      return updatedProfile;
    };

    //append username
    formData.append("username", profileData.username);
    formData.append("category", "profile");

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
          console.log("result: ", result);
          //Toast message
          notify("EDITED");
        } else {
          notify("SERVER_ERR");
          //throw new Error("Server ERROR");
        }
        return result;
      })
      .then((result) => {
        //setAuth triggers a rerender so no need to setShowProfile(false)
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
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setProfileData}
          resetObject={{ username: auth.username, profileImageUrl: auth }}
        />

        <div className="titleHeader">
          <CgProfile className="titleIcon" />
          <h1>{title} </h1>
        </div>

        {formType === "VIEW" && (
          <>
            <div className="bottom profile-view-container">
              <div className="profile-container">
                <div className="profile-img-container">
                  {/* Place holder div for pictures stack*/}
                </div>
              </div>
            </div>
            <div className="middle profile-view-container">
              <div className="profile-container">
                <div className="profile-img-container">
                  {/* Place holder div for pictures stack */}
                </div>
              </div>
            </div>
            <div className="top profile-view-container">
              <div className="profile-container">
                <div className="profile-img-container">
                  <img
                    src={
                      savedFilename
                        ? `${uploadsBaseURL}${savedFilename}`
                        : defaultProfile
                    }
                    alt="profile"
                    className="selected-profile-image"
                  />
                </div>
                <h4>{auth.username}</h4>
              </div>
            </div>
          </>
        )}

        {formType !== "VIEW" && (
          <div className="form-information">
            {/* PROFILE ACTIONS */}
            <div className="toolbar">
              <div className="toolbarItem" onClick={() => clearImage()}>
                <MdDelete className="icon delete" />
                <p>Remove profile picture</p>
              </div>
              <div className="toolbarItem" onClick={() => restoreOriginal()}>
                <MdRestore className="icon restore" />
                <p>Reset profile details</p>
              </div>
            </div>

            <div className="profile-box" onClick={() => fileClickHandler()}>
              {/* SELECTED / EXISTING PROFILE IMAGE */}
              <div className="profile-image-container">
                <img
                  src={previewImage}
                  alt="profile avatar preview"
                  className="profile-image"
                />
              </div>

              {/* UPLOAD ICON */}
              <div className="profile-add-container">
                <FaFileUpload className="add-file-icon" />
                <p>Upload picture</p>
              </div>

              {/* FILE INPUT */}
              <input
                type="file"
                accept="image/png, image/jpeg"
                name="profileFile"
                ref={fileRef}
                onChange={() => {
                  if (fileRef.current.files[0] !== undefined) {
                    setProfileData({
                      ...profileData,
                      file: fileRef.current.files[0],
                      filename: fileRef.current.files[0].name,
                    });
                  }
                }}
              />
            </div>

            {/* USERNAME INPUT */}
            <div className="input-item">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                autoComplete="off"
                size="40"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            {/* BUTTONS SECTION */}
            <div className="buttons">
              <SubmitButton
                type={formType}
                editFunction={handleSaveProfile}
                saveFunction={handleSaveProfile}
              />
            </div>
          </div>
        )}
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

    //IMAGE STACK
    .bottom {
      position: relative;
      top: 0%;
      left: 2%;
      transform: rotate(10deg);
    }
    .middle {
      position: relative;
      top: -100%;
      left: -3%;
      transform: rotate(-7deg);
    }
    .top {
      position: relative;
      top: -200%;
      left: 0%;
      transform: rotate(0deg);
    }

    //VIEW PROFILE MODAL
    .profile-view-container {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;

      .profile-container {
        height: 85%;
        padding: 1rem;
        box-shadow: 0 0 10px 5px #8f8f8f;
        border-radius: 4px;
        background-color: whitesmoke;
        display: flex;
        row-gap: 1rem;
        flex-direction: column;
        justify-content: center;
        //transform: rotate(-5deg);

        .profile-img-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20em;
          height: 20em;
          border-radius: 4px;
          overflow: hidden;

          .selected-profile-image {
            width: auto;
            height: 20em;
            object-fit: scale-down;
          }
        }

        h4 {
          color: #0c395e;
          font-size: 24pt;
          text-align: center;
          font-family: "Lobster Two", cursive;
        }
      }
    }

    //EDIT PROFILE TOOLBAR
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
          font-size: 11pt;
          font-weight: bold;
          font-variant: all-small-caps;
        }
        .icon {
          cursor: pointer;
          width: 1.5rem;
          height: 1.5rem;
        }
        .delete {
          color: #920000;
        }
        .restore {
          color: #005e00;
        }
      }
    }

    //EDIT PROFILE MODAL
    .form-information {
      height: 90%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .profile-box {
        border: dashed 3px #313131;
        outline-offset: 5px;
        z-index: 5;
        height: 250px;
        width: 250px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;

        .profile-add-container {
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
            z-index: 1;
            height: 50%;
            width: 50%;
          }
        }
        .profile-image-container {
          z-index: 2;
          background: whitesmoke;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            transition: 1s ease;
            opacity: 0;
          }
          .profile-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 50% 50%;
            //using overflow:hidden on container for better support
            //clip-path: circle(125px at center);
          }
        }

        input[type="file"] {
          display: none;
        }
      }

      input[type="text"] {
        color: #0c395e;
        padding: 0.25rem;
        font-size: 24pt;
        text-align: center;
        font-family: "Lobster Two", cursive;
        background-color: #ebebeb;
        border-radius: 4px;
        outline: solid 3px transparent;
        border: dashed 3px #313131;
        &:focus {
          outline: solid 3px #688297;
          border: solid 3px transparent;
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
        justify-content: flex-end;
        width: 100%;
      }
    }
  }
`;

export default Profile;
