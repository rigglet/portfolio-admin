import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FaDownload, FaUpload } from "react-icons/fa";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//data
import { postBackup, getLastBackup } from "../api/api";
//components
import CloseButton from "./closeButton";
import BackupRestoreButton from "./backupRestoreButton";
//import { split } from "lodash";

function Profile({
  auth,
  openingHookSetter,
  showBackup,
  title,
  formType,
  allData,
}) {
  //console.log(allData);

  const [applicationData, setApplicationData] = useState({
    name: "BACKUP",
    saveData: {},
  });

  const notify = (type) => {
    switch (type) {
      case "SERVER_ERR":
        toast.warning(`Internal Server error`);
        break;
      case "EDITED":
        toast.dark(`Profile SAVED`);
        break;
      case "ADDED":
        toast.dark(`Backup ADDED successfully`);
      case "LOADED":
        toast.dark(`Backup LOADED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  useEffect(() => {
    let dataType = "";
    let dataArr = [];

    //stringify data
    const data = JSON.stringify(
      allData.map((i, index, array) => {
        dataArr = i.config.url.split("/");
        dataType = dataArr[dataArr.length - 1];
        return { [dataType]: array[index].data };
      })
    );

    setApplicationData(() => ({
      ...applicationData,
      saveData: data,
    }));
  }, []);

  //console.log(applicationData);
  //HANDLE BACKUP - saves data as JSON to local storage
  const handleBackup = () => {
    const saveBackup = async () => {
      const savedBackup = await postBackup(auth, {
        name: applicationData.name,
        stringifiedJSONBackup: applicationData.saveData,
      });
      return savedBackup;
    };

    saveBackup().then(
      (result) => {
        //console.log(result);
        if (result.status === 200) {
          //local backup
          window.localStorage.setItem(
            applicationData.name,
            applicationData.saveData
          );
          notify("ADDED");
          //close modal
          openingHookSetter(!showBackup);
        }
      },
      (error) => {
        console.log(error);
        notify("SERVER_ERR");
      }
    );
  };

  const handleRestore = () => {
    const getBackup = async () => {
      return await getLastBackup(auth);
    };

    getBackup()
      .then(
        (result) => {
          //console.log(result);
          if (result.status === 200) {
            notify("LOADED");
            //close modal
            openingHookSetter(!showBackup);
          }
        },
        (error) => {
          //notify("SERVER_ERR");
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        notify("SERVER_ERR");
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
          resetFunction={setApplicationData}
          resetObject={{ data: {}, name: "" }}
        />

        <div className="titleHeader">
          {formType === "BACKUP" && <FaDownload className="titleIcon" />}
          {formType === "RESTORE" && <FaUpload className="titleIcon" />}
          <h1>{title} </h1>
        </div>

        <div className="form-information">
          {formType === "BACKUP" && (
            <div className="input-item">
              <label htmlFor="name">Back-up name:</label>

              <input
                type="text"
                name="name"
                autoComplete="off"
                size="40"
                value={applicationData.name}
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
