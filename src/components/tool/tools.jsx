import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import ToolList from "./toolList";
import ToolAdd from "./toolAddViewEdit";
//data
import { getData, deleteData, postData, updateData } from "../../api/api";

function Tools({ auth }) {
  const [tools, setTools] = useState({});
  const [currentTool, setCurrentTool] = useState(null);
  const [viewViewTool, setViewViewTool] = useState(false);
  const [viewAddTool, setViewAddTool] = useState(false);
  const [viewEditTool, setViewEditTool] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Tool EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Tool ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Tool ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  useEffect(
    () => {
      async function getTable() {
        return await getData(auth, "tools");
      }
      getTable().then((result) => {
        if (result.status === 200) {
          setTools(result.data);
        }
      });
    },
    // eslint-disable-next-line
    []
  );

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveTool = async (data) => {
    const editTool = async () => {
      return await updateData(auth, "tools", data);
    };

    const addTool = async () => {
      return await postData(auth, "tools", data);
    };

    data?.formtype === "EDIT"
      ? editTool()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then(() => {
            setTools([...tools.filter((t) => t._id !== data._id), data]);
          })
          .then(() => {
            setViewEditTool(false);
          })
      : addTool()
          .then((result) => {
            //Toast message
            notify("ADDED", result.status, result.data._id);
            return result;
          })
          .then((result) => {
            setTools([...tools, result.data]);
          })
          .then(() => {
            setViewAddTool(false);
          });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteTool = async () => {
      return await deleteData(auth, "tools", id);
    };

    deleteTool()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setTools([...tools.filter((t) => t._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (tool) => {
    setCurrentTool(tool);
  };

  return (
    <StyledTools>
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
        //view ADD TOOL modal
        viewAddTool ? (
          <ToolAdd
            openingHookSetter={setViewAddTool}
            handleSaveTool={handleSaveTool}
            title="Add new tool"
            showSubmit={true}
            formType={"NEW"}
          />
        ) : (
          ""
        )
      }

      {
        //view EDIT TOOL modal
        viewEditTool ? (
          <ToolAdd
            openingHookSetter={setViewEditTool}
            handleSaveTool={handleSaveTool}
            currentTool={currentTool}
            title="Edit tool"
            showSubmit={true}
            formType={"EDIT"}
          />
        ) : (
          ""
        )
      }
      {
        //view VIEW TOOL modal
        viewViewTool ? (
          <ToolAdd
            openingHookSetter={setViewViewTool}
            setViewViewTool={setViewViewTool}
            title="View tool"
            showSubmit={false}
            currentTool={currentTool}
            formType={"VIEW"}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Tools</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
            onClick={() => setViewAddTool(true)}
          />
        </div>
      </div>
      {tools.length > 0 ? (
        <ToolList
          tools={tools}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditTool={setViewEditTool}
          setViewViewTool={setViewViewTool}
        />
      ) : (
        <h4 className="empty">No tools to display</h4>
      )}
    </StyledTools>
  );
}

const StyledTools = styled(motion.div)`
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

export default Tools;
