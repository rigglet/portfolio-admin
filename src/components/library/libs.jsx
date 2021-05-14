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
//import DeleteConfirmation from "../DeleteConfirmation";
//data
import { deleteData, postData, updateData } from "../../api/api";

function Libs({ auth, libraries, setLibraries }) {
  const [libs, setLibs] = useState({});
  const [currentLib, setCurrentLib] = useState(null);
  const [viewViewLib, setViewViewLib] = useState(false);
  const [viewAddLib, setViewAddLib] = useState(false);
  const [viewEditLib, setViewEditLib] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Library EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Library ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Library ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveLib = async (data) => {
    const editLib = async () => {
      return await updateData(auth, "libraries", data);
    };

    const addLib = async () => {
      return await postData(auth, "libraries", data);
    };

    data?.formtype === "EDIT"
      ? editLib()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then((result) => {
            setLibraries([
              ...libraries.filter((p) => p._id !== data._id),
              data,
            ]);
          })
          .then(() => {
            setViewEditLib(false);
          })
      : addLib()
          .then((result) => {
            //Toast message
            notify("ADDED", result.status, result.data._id);
            return result;
          })
          .then((result) => {
            setLibraries([...libraries, result.data]);
          })
          .then(() => {
            setViewAddLib(false);
          });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteLib = async () => {
      return await deleteData(auth, "libraries", id);
    };

    deleteLib()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setLibraries([...libraries.filter((p) => p._id !== id)]);
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
            handleSaveLib={handleSaveLib}
            title="Add new library"
            showSubmit={true}
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT LIB modal
        viewEditLib && (
          <LibAdd
            openingHookSetter={setViewEditLib}
            handleSaveLib={handleSaveLib}
            currentLib={currentLib}
            title="Edit library"
            showSubmit={true}
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW LIB modal
        viewViewLib && (
          <LibAdd
            openingHookSetter={setViewViewLib}
            lib={currentLib}
            setViewViewLib={setViewViewLib}
            title="View library"
            showSubmit={false}
            currentLib={currentLib}
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
        <h4 className="empty">No libs to display</h4>
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
