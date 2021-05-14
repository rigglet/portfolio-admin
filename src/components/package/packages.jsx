import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import PackageList from "./packageList";
import PackageAdd from "./packageAddViewEdit";
//import DeleteConfirmation from "../DeleteConfirmation";
//data
import { deleteData, postData, updateData } from "../../api/api";

function Packages({ auth, packages, setPackages }) {
  const [currentPackage, setCurrentPackage] = useState(null);
  const [viewViewPackage, setViewViewPackage] = useState(false);
  const [viewAddPackage, setViewAddPackage] = useState(false);
  const [viewEditPackage, setViewEditPackage] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Package EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Package ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Package ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD/EDIT SUBMIT
  const handleSavePackage = async (data) => {
    const editPackage = async () => {
      return await updateData(auth, "packages", data);
    };

    const addPackage = async () => {
      return await postData(auth, "packages", data);
    };

    data?.formtype === "EDIT"
      ? editPackage()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then((result) => {
            setPackages([...packages.filter((p) => p._id !== data._id), data]);
          })
          .then(() => {
            setViewEditPackage(false);
          })
      : addPackage()
          .then((result) => {
            //Toast message
            notify("ADDED", result.status, result.data._id);
            return result;
          })
          .then((result) => {
            setPackages([...packages, result.data]);
          })
          .then(() => {
            setViewAddPackage(false);
          });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deletePackage = async () => {
      return await deleteData(auth, "packages", id);
    };

    deletePackage()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setPackages([...packages.filter((p) => p._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (pack) => {
    setCurrentPackage(pack);
  };

  return (
    <StyledPackages>
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

      {
        //view ADD PACKAGE modal
        viewAddPackage ? (
          <PackageAdd
            openingHookSetter={setViewAddPackage}
            handleSavePackage={handleSavePackage}
            title="Add new package"
            showSubmit={true}
            formType={"NEW"}
          />
        ) : (
          ""
        )
      }

      {
        //view EDIT PACKAGE modal
        viewEditPackage ? (
          <PackageAdd
            openingHookSetter={setViewEditPackage}
            handleSavePackage={handleSavePackage}
            currentPackage={currentPackage}
            title="Edit package"
            showSubmit={true}
            formType={"EDIT"}
          />
        ) : (
          ""
        )
      }
      {
        //view VIEW PACKAGE modal
        viewViewPackage ? (
          <PackageAdd
            openingHookSetter={setViewViewPackage}
            pack={currentPackage}
            setViewViewPackage={setViewViewPackage}
            title="View package"
            showSubmit={false}
            currentPackage={currentPackage}
            formType={"VIEW"}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Packages</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
            onClick={() => setViewAddPackage(true)}
          />
        </div>
      </div>
      {packages.length > 0 ? (
        <PackageList
          packages={packages}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditPackage={setViewEditPackage}
          setViewViewPackage={setViewViewPackage}
        />
      ) : (
        <h4 className="empty">No packages to display</h4>
      )}
    </StyledPackages>
  );
}

const StyledPackages = styled(motion.div)`
  position: relative;
  left: 15.5vw;
  top: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  //empty table msg
  .empty {
    margin-top: 2rem;
  }
  //top header
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80vw;
    margin-bottom: 0.5rem;
    .toolbar {
      display: flex;
      gap: 0.5rem;
      .h-icon {
        cursor: pointer;
        width: 1.4rem;
        height: 1.4rem;
      }
    }
    h1 {
      font-size: 16pt;
      font-weight: 600;
    }
  }
`;

export default Packages;
