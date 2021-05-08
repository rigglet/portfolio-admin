import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//images
import profile from "../images/profile.svg";
//icons
//import { AiOutlineFileImage } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { FaRegSave, FaEdit, FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//forms
import { useForm } from "react-hook-form";
//data
import { updateUser } from "../api/api";

function Profile({
  auth,
  setAuth,
  setShowProfile,
  selectedFile,
  setSelectedFile,
}) {
  const baseURL = `http://localhost:8081/public/uploads/`;
  const fileRef = useRef(null);
  const { register, handleSubmit } = useForm({
    defaultValues: { username: `${auth.username}` },
  });
  const [editing, setEditing] = useState(false);
  const [clearingImage, setClearingImage] = useState(false);
  const profileImageUrl = auth.profileImageUrl?.fileName || null;

  //console.log(auth);

  const notify = (type, status) => {
    switch (type) {
      case "SERVER_ERR":
        toast.warning(`Internal Server error: Profile not saved.`);
        break;
      case "EDITED":
        toast.dark(`Profile SAVED`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Profile image ADDED successfully`);
        break;
      case "NOIMAGE":
        toast.dark(`Please select a profile image!`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Profile image DELETED successfully`);
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
    console.log("Reset icon");
    fileRef.current.value = null;

    if (profileImageUrl !== null) {
      setSelectedFile(`${baseURL}${profileImageUrl}`);
    } else {
      setSelectedFile(null);
    }
    setClearingImage(false);
  };

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveProfile = (data) => {
    //console.log("fileRef: ", fileRef.current.files);
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
    }
    //else {
    // console.log("No image selected");
    // notify("NOIMAGE");
    // return;
    //}
    else {
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
          notify("EDITED", result.status, result.data._id);
        } else {
          notify("SERVER_ERR");
          //throw new Error("Server ERROR");
        }
        return result;
      })
      .then((result) => {
        //setAuth triggers a rerender so no need to setShowProfile
        console.log("result: ", result);
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
          {editing ? (
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
          ) : (
            <div className="toolbarItem" onClick={() => setEditing(!editing)}>
              <FaEdit className="h-icon" />
              <p>Edit Profile</p>
            </div>
          )}
        </div>
        {!editing && (
          <>
            <button className="close" onClick={() => setShowProfile(false)}>
              &#10008;
            </button>
          </>
        )}
        <h1>Profile</h1>
        <div className="form-information">
          <form onSubmit={handleSubmit(handleSaveProfile)}>
            <>
              <div
                className={
                  editing
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
                    editing ? "profile-image-edit" : "profile-image-show"
                  }
                />

                {/*upload icon */}
                <div
                  className={
                    editing
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
                  {...register("profileFile")}
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
              {/* {editing && (
                <h4>{fileRef?.current?.files[0]?.name}</h4>
              )} */}
              {/*editing && <h4>{selectedFile}</h4>*/}
            </>

            <div className="input-item">
              {editing ? <label htmlFor="username">Username:</label> : ""}
              <input
                className={editing ? "editing" : ""}
                disabled={editing ? false : true}
                type="text"
                {...register("username")}
                autoComplete="off"
                size="40"
              />
            </div>

            <div className="buttons">
              {editing && (
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
              {editing && (
                <button type="submit">
                  <FaRegSave />
                  Save
                </button>
              )}
            </div>
          </form>
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
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;
    padding: 2rem;
    box-shadow: 0 0 20px 10px #689ed0;
    h1 {
      font-size: 16pt;
      font-weight: 600;
      margin-bottom: 0.5rem;
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
        p{
          cursor: pointer;
        }
      .h-icon {
        cursor: pointer;
        width: 1.6rem;
        height: 1.6rem;
      }
      }
    }
    .form-information {
      height: 100%;
      width: 100%;
      padding: 2rem;

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
          border:none;
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
          overflow:hidden;
            
          .showFileIcon{display: flex;}
          .hideFileIcon{display: none;} 
          .profile-add-container{
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
          .profile-image-show {
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: 50% 50%;
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
          //font-family: "Roboto Condensed", sans-serif;
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
  }
`;

export default Profile;
