import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import TechList from "./techList";
import TechAdd from "./techAddViewEdit";
//data
import { deleteData, postData, updateData } from "../../api/api";

function Techs({ auth, techs, setTechs, projects, setProjects, allIcons }) {
  const [currentTech, setCurrentTech] = useState({
    name: "",
    //type: "",
    category: "",
    description: "",
    address: "",
    icon: "",
    color: "",
    documentation: "",
  });
  const [viewViewTech, setViewViewTech] = useState(false);
  const [viewAddTech, setViewAddTech] = useState(false);
  const [viewEditTech, setViewEditTech] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Technology EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Technology ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Technology DELETED successfully`);
        break;
      case "EDIT_ERROR":
        toast.dark(`Error EDITING technology: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING technology: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING technology: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD TECHNOLOGY
  const handleSaveTech = async () => {
    setFetchingData(true);

    const addTech = async () => {
      return await postData(auth, "technologies", currentTech);
    };

    addTech()
      .then((result) => {
        if (result.status === 200) {
          setTechs([...techs, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentTech({
          name: "",
          //type: "",
          category: "",
          description: "",
          address: "",
          icon: "",
          color: "",
          documentation: "",
        });
        setViewAddTech(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE EDIT TECHNOLOGY
  const handleEditTech = async () => {
    setFetchingData(true);

    const editTech = async () => {
      return await updateData(auth, "technologies", currentTech);
    };

    editTech()
      .then((result) => {
        if (result.status === 200) {
          //update technology state
          setTechs([
            ...techs.filter((t) => t._id !== currentTech._id),
            currentTech,
          ]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              technologies: [
                ...project.technologies.map((technology) => {
                  if (technology._id === currentTech._id) {
                    return currentTech;
                  } else {
                    return technology;
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
        setCurrentTech({
          name: "",
          //type: "",
          category: "",
          description: "",
          address: "",
          icon: "",
          color: "",
          documentation: "",
        });
        setViewEditTech(false);
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

    const deleteTech = async () => {
      return await deleteData(auth, "technologies", id);
    };

    deleteTech()
      .then((result) => {
        if (result.status === 200) {
          //update technologies state
          setTechs([...techs.filter((t) => t._id !== id)]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              technologies: [
                ...project.technologies.filter(
                  (technology) => technology._id !== id
                ),
              ],
            }))
          );
        }
      })
      .then(() => {
        setFetchingData(false);
        //Toast message
        notify("DELETED");
      })
      .catch((err) => {
        notify("DELETE_ERROR", err);
        setDeletingData(false);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (tech) => {
    setCurrentTech({ ...currentTech, ...tech });
  };

  return (
    <StyledTechs>
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
        //view ADD TECH modal
        viewAddTech && (
          <TechAdd
            openingHookSetter={setViewAddTech}
            currentTech={currentTech}
            setCurrentTech={setCurrentTech}
            handleSaveTech={handleSaveTech}
            handleEditTech={handleEditTech}
            fetchingData={fetchingData}
            title="Add new technology"
            formType={"ADD"}
            allIcons={allIcons}
          />
        )
      }

      {
        //view EDIT TECH modal
        viewEditTech && (
          <TechAdd
            openingHookSetter={setViewEditTech}
            currentTech={currentTech}
            setCurrentTech={setCurrentTech}
            handleEditTech={handleEditTech}
            handleSaveTech={handleSaveTech}
            fetchingData={fetchingData}
            title="Edit technology"
            formType={"EDIT"}
            allIcons={allIcons}
          />
        )
      }

      {
        //view VIEW TECH modal
        viewViewTech && (
          <TechAdd
            openingHookSetter={setViewViewTech}
            currentTech={currentTech}
            setCurrentTech={setCurrentTech}
            title="View technology"
            formType={"VIEW"}
            allIcons={allIcons}
          />
        )
      }

      <div className="header">
        <h1>Technologies</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="header-icon"
            onClick={() => setViewAddTech(true)}
          />
        </div>
      </div>
      {techs.length > 0 ? (
        <TechList
          techs={techs}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditTech={setViewEditTech}
          setViewViewTech={setViewViewTech}
          deletingData={deletingData}
          clickedItem={clickedItem}
        />
      ) : (
        <h4 className="empty">No technologies to display</h4>
      )}
    </StyledTechs>
  );
}

const StyledTechs = styled(motion.div)`
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

export default Techs;
