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

function Techs({ auth, techs, setTechs, projects, setProjects }) {
  const [currentTech, setCurrentTech] = useState({
    name: "",
    type: "",
    address: "",
    icon: "",
    documentation: "",
  });
  const [viewViewTech, setViewViewTech] = useState(false);
  const [viewAddTech, setViewAddTech] = useState(false);
  const [viewEditTech, setViewEditTech] = useState(false);

  const notify = (type) => {
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
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD TECHNOLOGY
  const handleSaveTech = async () => {
    const addTech = async () => {
      return await postData(auth, "technologies", currentTech);
    };

    addTech()
      .then((result) => {
        //Toast message
        notify("ADDED");
        return result;
      })
      .then((result) => {
        setTechs([...techs, result.data]);
      })
      .then(() => {
        setViewAddTech(false);
        setCurrentTech({
          name: "",
          type: "",
          address: "",
          icon: "",
          documentation: "",
        });
      });
  };

  //HANDLE EDIT TECHNOLOGY
  const handleEditTech = async () => {
    const editTech = async () => {
      return await updateData(auth, "technologies", currentTech);
    };

    editTech()
      .then(
        (result) => {
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
                  ...project.technologies.filter(
                    (technology) => technology._id !== currentTech._id
                  ),
                  currentTech,
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
        setCurrentTech({
          name: "",
          type: "",
          address: "",
          icon: "",
          documentation: "",
        });
        setViewEditTech(false);
      });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
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
        //Toast message
        notify("DELETED");
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
            title="Add new technology"
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT TECH modal
        viewEditTech && (
          <TechAdd
            openingHookSetter={setViewEditTech}
            handleEditTech={handleEditTech}
            handleSaveTech={handleSaveTech}
            currentTech={currentTech}
            setCurrentTech={setCurrentTech}
            title="Edit technology"
            formType={"EDIT"}
          />
        )
      }

      {
        //view VIEW TECH modal
        viewViewTech && (
          <TechAdd
            openingHookSetter={setViewViewTech}
            setViewViewTech={setViewViewTech}
            currentTech={currentTech}
            setCurrentTech={setCurrentTech}
            title="View technology"
            formType={"VIEW"}
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
`;

export default Techs;
