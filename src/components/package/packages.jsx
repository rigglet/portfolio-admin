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

function Packages({ auth, packages, setPackages, projects, setProjects, allIcons }) {
  const packageResetObject = {
    name: "",
    version: "",
    description: "",
    npmaddress: "",
    githubrepo: "",
    homepage: "",
    documentation: "",
    iconSearch: "",
    icon: "",
    color: "#313131",
  }
  const [currentPackage, setCurrentPackage] = useState(packageResetObject);

  const [viewViewPackage, setViewViewPackage] = useState(false);
  const [viewAddPackage, setViewAddPackage] = useState(false);
  const [viewEditPackage, setViewEditPackage] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Package EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Package ADDED successfully`);
        break;
      case "DUPLICATED":
        toast.dark(`Package DUPLICATED successfully`);
        break;
      case "DELETED":
        toast.dark(`Package DELETED successfully`);
        break;
      case "EDIT_ERROR":
        toast.dark(`Error EDITING package: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING package: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING package: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD PACKAGE
  const handleSavePackage = async () => {
    setFetchingData(true);

    const addPackage = async () => {
      return await postData(auth, "packages", currentPackage);
    };

    addPackage()
      .then((result) => {
        if (result.status === 200) {
          setPackages([...packages, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentPackage(packageResetObject);
        setViewAddPackage(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };
  //HANDLE ADD PACKAGE
  const handleDuplicatePackage = async (pack) => {
    setFetchingData(true);

    const addPackage = async () => {
      return await postData(auth, "packages", pack);
    };

    addPackage()
      .then((result) => {
        if (result.status === 200) {
          setPackages([...packages, result.data]);
          //Toast message
          notify("DUPLICATED");
        }
      })
      .then(() => {
        setFetchingData(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE EDIT PACKAGE
  const handleEditPackage = async () => {
    setFetchingData(true);

    const editPackage = async () => {
      return await updateData(auth, "packages", currentPackage);
    };

    editPackage()
      .then((result) => {
        if (result.status === 200) {
          //update package state
          setPackages([
            ...packages.filter((p) => p._id !== currentPackage._id),
            currentPackage,
          ]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              packages: [
                ...project.packages.map((pack) => {
                  if (pack._id === currentPackage._id) {
                    return currentPackage;
                  } else {
                    return pack;
                  }
                }),
              ],
            }))
          );

          //Toast message
          notify("EDITED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentPackage(packageResetObject);
        setViewEditPackage(false);
      })
      .catch((err) => {
        notify("EDIT_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    setDeletingData(true);
    setClickedItem(id);

    const deletePackage = async () => {
      return await deleteData(auth, "packages", id);
    };

    deletePackage()
      .then((result) => {
        if (result.status === 200) {
          //update package state
          setPackages([...packages.filter((p) => p._id !== id)]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              packages: [...project.packages.filter((pack) => pack._id !== id)],
            }))
          );
        }
      })
      .then(() => {
        setDeletingData(false);
        //Toast message
        notify("DELETED");
      })
      .catch((err) => {
        notify("DELETE_ERROR", err);
        setDeletingData(false);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (pack) => {
    setCurrentPackage({ ...currentPackage, ...pack });
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
            fetchingData={fetchingData}
            allIcons={allIcons}
            title="Add new package"
            formType={"ADD"}
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
            fetchingData={fetchingData}
            allIcons={allIcons}
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
            currentPackage={currentPackage}
            setCurrentPackage={setCurrentPackage}
            allIcons={allIcons}
            title="View package"
            formType={"VIEW"}
          />
        )
      }
      <div className="header">
        <h1>Packages</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="header-icon"
            onClick={() => setViewAddPackage(true)}
          />
        </div>
      </div>
      {packages.length > 0 ? (
        <PackageList
          packages={packages}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          handleDuplicatePackage={handleDuplicatePackage}
          setViewEditPackage={setViewEditPackage}
          setViewViewPackage={setViewViewPackage}
          deletingData={deletingData}
          clickedItem={clickedItem}
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

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    position: static;
    padding: 0.5rem;
    display: flex;
    width: 100vw;
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    position: static;
    padding: 0.5rem;
    display: flex;
    width: 100vw;
  }

  //481px — 768px: iPads, Tablets
  @media screen and (min-width: 481px) and (max-width: 769px) and (orientation: portrait) {
  }

  //481px — 768px: iPads, Tablets
  //@media screen and (min-width: 481px) and (max-width: 769px) and (orientation: landscape) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {}

  //769px — 1024px: Small screens, laptops
  //@media screen and (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {}

  //1025px — 1200px: Desktops, large screens
  @media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {
  }

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  @media screen and (min-width: 1921px) and (orientation: landscape) {
  }
`;

export default Packages;
