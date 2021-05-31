import { useState } from "react";
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
import { deleteData, postData, updateData } from "../../api/api";

function Tools({ auth, tools, setTools }) {
  const [currentTool, setCurrentTool] = useState({
    name: "",
    type: "",
    category: "",
    address: "",
  });
  const [viewViewTool, setViewViewTool] = useState(false);
  const [viewAddTool, setViewAddTool] = useState(false);
  const [viewEditTool, setViewEditTool] = useState(false);

  const notify = (type) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Tool EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Tool ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Tool DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD TOOL
  const handleSaveTool = async () => {
    const addTool = async () => {
      return await postData(auth, "tools", currentTool);
    };

    addTool()
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
        setCurrentTool({
          name: "",
          type: "",
          category: "",
          address: "",
        });
      });
  };

  //HANDLE EDIT TOOL
  const handleEditTool = async () => {
    const editTool = async () => {
      return await updateData(auth, "tools", currentTool);
    };

    editTool()
      .then((result) => {
        //Toast message
        notify("EDITED", result.status, result._id);
        return result;
      })
      .then(() => {
        setTools([
          ...tools.filter((t) => t._id !== currentTool._id),
          currentTool,
        ]);
      })
      .then(() => {
        setViewEditTool(false);
        setCurrentTool({
          name: "",
          type: "",
          category: "",
          address: "",
        });
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
        viewAddTool && (
          <ToolAdd
            openingHookSetter={setViewAddTool}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            handleSaveTool={handleSaveTool}
            handleEditTool={handleEditTool}
            title="Add new tool"
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT TOOL modal
        viewEditTool && (
          <ToolAdd
            openingHookSetter={setViewEditTool}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            handleSaveTool={handleSaveTool}
            handleEditTool={handleEditTool}
            title="Edit tool"
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW TOOL modal
        viewViewTool && (
          <ToolAdd
            openingHookSetter={setViewViewTool}
            currentTool={currentTool}
            setCurrentTool={setCurrentTool}
            handleSaveTool={handleSaveTool}
            handleEditTool={handleEditTool}
            title="View tool"
            formType={"VIEW"}
          />
        )
      }

      <div className="header">
        <h1>Tools</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="header-icon"
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
`;

export default Tools;
