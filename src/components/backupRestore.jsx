import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaDownload, FaUpload } from "react-icons/fa";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//data
import { updateUser } from "../api/api";
//components
import CloseButton from "./closeButton";
import BackupRestoreButton from "./backupRestoreButton";
import { split } from "lodash";

function Profile({
  auth,
  setAuth,
  openingHookSetter,
  showBackup,
  title,
  formType,
  allData,
}) {
  //console.log(allData);

  const [applicationData, setApplicationData] = useState({
    data: {},
    filename: "BACKUP",
  });

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

  //HANDLE BACKUP - saves data as JSON to local storage
  const handleBackup = () => {
    let saveData = "";
    let dataType = "";
    let dataArr = [];
    //console.log(allData.map(i=>{console.log(i)}));
    saveData = JSON.stringify(
      allData.map((i, index, array) => {
        dataArr = i.config.url.split("/");
        dataType = dataArr[dataArr.length - 1];
        return { [dataType]: array[index].data };
      })
    );
    console.log(saveData);
    window.localStorage.setItem(applicationData.filename, saveData);
    openingHookSetter(!showBackup);
  };

  const handleRestore = () => {
    console.log("restore");
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
          resetFunction={setApplicationData}
          resetObject={{ data: {}, filename: "" }}
        />

        <div className="titleHeader">
          {formType === "BACKUP" && <FaDownload className="titleIcon" />}
          {formType === "RESTORE" && <FaUpload className="titleIcon" />}
          <h1>{title} </h1>
        </div>

        <div className="form-information">
          {formType === "BACKUP" && (
            <div className="input-item">
              <label htmlFor="filename">Back-up name:</label>

              <input
                type="text"
                name="filename"
                autoComplete="off"
                size="40"
                value={applicationData.filename}
                onChange={(e) =>
                  setApplicationData({
                    ...applicationData,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          )}

          {formType === "RESTORE" && <h1>Restore</h1>}

          <div className="buttons">
            <BackupRestoreButton
              type={formType}
              backupFunction={handleBackup}
              restoreFunction={handleRestore}
            />
          </div>
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
    width: 50vw;
    height: 50vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    padding: 2rem;
    box-shadow: 0 0 20px 10px #689ed0;

    //EDIT PROFILE MODAL
    .form-information {
      height: 80%;
      width: 100%;
      display: flex;
      //align-items: center;
      justify-content: center;
      flex-direction: column;
      //border: 1px solid red;
      gap: 3rem;
      }

      .input-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.25rem;
        label {
          font-weight: bold;
          font-size: 14pt;
          font-variant-caps: all-small-caps;
          margin-bottom: 0.5rem;
        }
        input[type="text"] {
          width: 100%;
          color: #313131;
          padding: 0.25rem;
          font-size: 14pt;
          text-align: center;
          font-family: "Poppins", cursive;
          background-color: #ebebeb;
          border-radius: 4px;
          outline: solid 2px transparent;
          border: solid 1px #313131;
          &:focus {
            outline: solid 2px #688297;
            border: solid 1px transparent;
          }
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
