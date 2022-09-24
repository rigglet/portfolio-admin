import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import LibList from "./libList";
import LibAdd from "./libAddViewEdit";
//data
import { deleteData, postData, updateData } from "../../api/api";

function Libs({ auth, libraries, setLibraries, projects, setProjects, allIcons }) {
  const libraryResetObject = {
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
  const [currentLib, setCurrentLib] = useState(libraryResetObject);
  const [viewViewLib, setViewViewLib] = useState(false);
  const [viewAddLib, setViewAddLib] = useState(false);
  const [viewEditLib, setViewEditLib] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Library EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Library ADDED successfully`);
        break;
      case "DUPLICATED":
        toast.dark(`Library DUPLICATED successfully`);
        break;
      case "DELETED":
        toast.dark(`Library DELETED successfully`);
        break;
      case "EDIT_ERROR":
        toast.dark(`Error EDITING library: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING library: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING library: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD LIBRARY
  const handleSaveLib = async () => {
    setFetchingData(true);

    const addLib = async () => {
      return await postData(auth, "libraries", currentLib);
    };

    addLib()
      .then((result) => {
        if (result.status === 200) {
          setLibraries([...libraries, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentLib(libraryResetObject);
        setViewAddLib(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE ADD LIBRARY
  const handleDuplicateLibrary = async (library) => {
    setFetchingData(true);

    const addLib = async () => {
      return await postData(auth, "libraries", library);
    };

    addLib()
      .then((result) => {
        if (result.status === 200) {
          setLibraries([...libraries, result.data]);
          //Toast message
          notify("ADDED");
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

  //HANDLE EDIT LIBRARY
  const handleEditLib = async () => {
    setFetchingData(true);

    const editLib = async () => {
      return await updateData(auth, "libraries", currentLib);
    };

    editLib()
      .then((result) => {
        if (result.status === 200) {
          //set library state
          setLibraries([
            ...libraries.filter((p) => p._id !== currentLib._id),
            currentLib,
          ]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              libraries: [
                ...project.libraries.map((library) => {
                  if (library._id === currentLib._id) {
                    return currentLib;
                  } else {
                    return library;
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
        setCurrentLib(libraryResetObject);
        setViewEditLib(false);
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

    const deleteLib = async () => {
      return await deleteData(auth, "libraries", id);
    };

    deleteLib()
      .then((result) => {
        if (result.status === 200) {
          //update library state
          setLibraries([...libraries.filter((p) => p._id !== id)]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              libraries: [
                ...project.libraries.filter((library) => library._id !== id),
              ],
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
  const handleViewEditRecord = (lib) => {
    setCurrentLib({ ...currentLib, ...lib });
  };

  return (
    <StyledLibs>
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
        //view ADD LIB modal
        viewAddLib && (
          <LibAdd
            openingHookSetter={setViewAddLib}
            currentLib={currentLib}
            setCurrentLib={setCurrentLib}
            handleSaveLib={handleSaveLib}
            handleEditLib={handleEditLib}
            fetchingData={fetchingData}
            allIcons={allIcons}
            title="Add new library"
            formType={"ADD"}
          />
        )
      }

      {
        //view EDIT LIB modal
        viewEditLib && (
          <LibAdd
            openingHookSetter={setViewEditLib}
            currentLib={currentLib}
            setCurrentLib={setCurrentLib}
            handleEditLib={handleEditLib}
            handleSaveLib={handleSaveLib}
            fetchingData={fetchingData}
            allIcons={allIcons}
            title="Edit library"
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW LIB modal
        viewViewLib && (
          <LibAdd
            openingHookSetter={setViewViewLib}
            currentLib={currentLib}
            setCurrentLib={setCurrentLib}
            allIcons={allIcons}
            title="View library"
            formType={"VIEW"}
          />
        )
      }
      <div className="header">
        <h1>Libraries</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="header-icon"
            onClick={() => setViewAddLib(true)}
          />
        </div>
      </div>
      {libraries.length > 0 ? (
        <LibList
          libraries={libraries}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          handleDuplicateLibrary={handleDuplicateLibrary}
          setViewEditLib={setViewEditLib}
          setViewViewLib={setViewViewLib}
          deletingData={deletingData}
          clickedItem={clickedItem}
        />
      ) : (
        <h4 className="empty">No libraries to display</h4>
      )}
    </StyledLibs>
  );
}

const StyledLibs = styled(motion.div)`
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

export default Libs;
