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
    icon: "",
    documentation: "",
  });
  const [viewViewTool, setViewViewTool] = useState(false);
  const [viewAddTool, setViewAddTool] = useState(false);
  const [viewEditTool, setViewEditTool] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
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
      case "EDIT_ERROR":
        toast.dark(`Error EDITING tool: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING tool: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING tool: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD TOOL
  const handleSaveTool = async () => {
    setFetchingData(true);

    const addTool = async () => {
      return await postData(auth, "tools", currentTool);
    };

    addTool()
      .then((result) => {
        if (result.status === 200) {
          setTools([...tools, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentTool({
          name: "",
          type: "",
          category: "",
          address: "",
          icon: "",
          documentation: "",
        });
        setViewAddTool(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE EDIT TOOL
  const handleEditTool = async () => {
    setFetchingData(true);

    const editTool = async () => {
      return await updateData(auth, "tools", currentTool);
    };

    editTool()
      .then((result) => {
        if (result.status === 200) {
          setTools([
            ...tools.filter((t) => t._id !== currentTool._id),
            currentTool,
          ]);
          //Toast message
          notify("EDITED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentTool({
          name: "",
          type: "",
          category: "",
          address: "",
          icon: "",
          documentation: "",
        });
        setViewEditTool(false);
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

    const deleteTool = async () => {
      return await deleteData(auth, "tools", id);
    };

    deleteTool()
      .then((result) => {
        if (result.status === 200) {
          setTools([...tools.filter((t) => t._id !== id)]);
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
  const handleViewEditRecord = (tool) => {
    setCurrentTool({ ...currentTool, ...tool });
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
            fetchingData={fetchingData}
            title="Add new tool"
            formType={"ADD"}
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
            fetchingData={fetchingData}
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
          deletingData={deletingData}
          clickedItem={clickedItem}
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

export default Tools;
