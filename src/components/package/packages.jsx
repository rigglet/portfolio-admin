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
//data
import { deleteData, postData, updateData } from "../../api/api";

function Packages({ auth, packages, setPackages }) {
  const [currentPackage, setCurrentPackage] = useState({
    name: "",
    version: "",
    description: "",
    npmaddress: "",
    githubrepo: "",
    homepage: "",
  });

  const [viewViewPackage, setViewViewPackage] = useState(false);
  const [viewAddPackage, setViewAddPackage] = useState(false);
  const [viewEditPackage, setViewEditPackage] = useState(false);

  const notify = (type) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Package EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Package ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Package DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD PACKAGE
  const handleSavePackage = async () => {
    const addPackage = async () => {
      return await postData(auth, "packages", currentPackage);
    };

    addPackage()
      .then((result) => {
        //Toast message
        notify("ADDED", result.status, result.data._id);
        return result;
      })
      .then((result) => {
        setPackages([...packages, result.data]);
      })
      .then(() => {
        setCurrentPackage({
          name: "",
          version: "",
          description: "",
          npmaddress: "",
          githubrepo: "",
          homepage: "",
        });
        setViewAddPackage(false);
      });
  };

  //HANDLE EDIT PACKAGE
  const handleEditPackage = async () => {
    const editPackage = async () => {
      return await updateData(auth, "packages", currentPackage);
    };

    editPackage()
      .then((result) => {
        //Toast message
        notify("EDITED");
        return result;
      })
      .then((result) => {
        setPackages([
          ...packages.filter((p) => p._id !== currentPackage._id),
          currentPackage,
        ]);
      })
      .then(() => {
        setCurrentPackage({
          name: "",
          version: "",
          description: "",
          npmaddress: "",
          githubrepo: "",
          homepage: "",
          //TODO: documentation: ""
        });
        setViewEditPackage(false);
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
        viewAddPackage && (
          <PackageAdd
            openingHookSetter={setViewAddPackage}
            currentPackage={currentPackage}
            setCurrentPackage={setCurrentPackage}
            handleEditPackage={handleEditPackage}
            handleSavePackage={handleSavePackage}
            title="Add new package"
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT PACKAGE modal
        viewEditPackage && (
          <PackageAdd
            openingHookSetter={setViewEditPackage}
            currentPackage={currentPackage}
            setCurrentPackage={setCurrentPackage}
            handleEditPackage={handleEditPackage}
            handleSavePackage={handleSavePackage}
            title="Edit package"
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW PACKAGE modal
        viewViewPackage && (
          <PackageAdd
            openingHookSetter={setViewViewPackage}
            setViewViewPackage={setViewViewPackage}
            title="View package"
            currentPackage={currentPackage}
            setCurrentPackage={setCurrentPackage}
            formType={"VIEW"}
          />
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
