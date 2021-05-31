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

function Libs({ auth, libraries, setLibraries, projects, setProjects }) {
  const [currentLib, setCurrentLib] = useState({
    name: "",
    version: "",
    description: "",
    npmaddress: "",
    githubrepo: "",
    homepage: "",
    //TODO: documentation: ""
  });
  const [viewViewLib, setViewViewLib] = useState(false);
  const [viewAddLib, setViewAddLib] = useState(false);
  const [viewEditLib, setViewEditLib] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Library EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Library ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Library DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD LIBRARY
  const handleSaveLib = async () => {
    const addLib = async () => {
      return await postData(auth, "libraries", currentLib);
    };

    addLib()
      .then((result) => {
        //Toast message
        notify("ADDED", result.status, result.data._id);
        return result;
      })
      .then((result) => {
        setLibraries([...libraries, result.data]);
      })
      .then(() => {
        setCurrentLib({
          name: "",
          version: "",
          description: "",
          npmaddress: "",
          githubrepo: "",
          homepage: "",
        });
        setViewAddLib(false);
      });
  };

  //HANDLE EDIT LIBRARY
  const handleEditLib = async () => {
    const editLib = async () => {
      return await updateData(auth, "libraries", currentLib);
    };

    editLib()
      .then(
        (result) => {
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
                  ...project.libraries.filter(
                    (library) => library._id !== currentLib._id
                  ),
                  currentLib,
                ],
              }))
            );
            //Toast message
            notify("EDITED");
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .then(() => {
        setCurrentLib({
          name: "",
          version: "",
          description: "",
          npmaddress: "",
          githubrepo: "",
          homepage: "",
        });
        setViewEditLib(false);
      });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
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
      .then((result) => {
        //Toast message
        notify("DELETED");
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (lib) => {
    setCurrentLib(lib);
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
            title="Add new library"
            formType={"NEW"}
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
            setViewViewLib={setViewViewLib}
            title="View library"
            currentLib={currentLib}
            setCurrentLib={setCurrentLib}
            formType={"VIEW"}
          />
        )
      }
      <div className="header">
        <h1>Libraries</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
            onClick={() => setViewAddLib(true)}
          />
        </div>
      </div>
      {libraries.length > 0 ? (
        <LibList
          libraries={libraries}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditLib={setViewEditLib}
          setViewViewLib={setViewViewLib}
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

export default Libs;
