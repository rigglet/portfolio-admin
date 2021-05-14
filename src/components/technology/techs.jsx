import { useState, useEffect } from "react";
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
import { getData, deleteData, postData, updateData } from "../../api/api";

function Techs({ auth }) {
  const [techs, setTechs] = useState({});
  const [currentTech, setCurrentTech] = useState(null);
  const [viewViewTech, setViewViewTech] = useState(false);
  const [viewAddTech, setViewAddTech] = useState(false);
  const [viewEditTech, setViewEditTech] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Technology EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Technology ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(
          `Status: ${status} => Technology ${id} DELETED successfully`
        );
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  useEffect(() => {
    async function getTable() {
      return await getData(auth, "technologies");
    }
    getTable().then((result) => {
      if (result.status === 200) {
        setTechs(result.data);
      }
    });
  }, []);

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveTech = async (data) => {
    const editTech = async () => {
      return await updateData(auth, "technologies", data);
    };

    const addTech = async () => {
      return await postData(auth, "technologies", data);
    };

    data?.formtype === "EDIT"
      ? editTech()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then(() => {
            setTechs([...techs.filter((t) => t._id !== data._id), data]);
          })
          .then(() => {
            setViewEditTech(false);
          })
      : addTech()
          .then((result) => {
            //Toast message
            notify("ADDED", result.status, result.data._id);
            return result;
          })
          .then((result) => {
            setTechs([...techs, result.data]);
          })
          .then(() => {
            setViewAddTech(false);
          });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteTech = async () => {
      return await deleteData(auth, "technologies", id);
    };

    deleteTech()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setTechs([...techs.filter((t) => t._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (tech) => {
    setCurrentTech(tech);
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
        viewAddTech ? (
          <TechAdd
            openingHookSetter={setViewAddTech}
            handleSaveTech={handleSaveTech}
            title="Add new technology"
            showSubmit={true}
            formType={"NEW"}
          />
        ) : (
          ""
        )
      }

      {
        //view EDIT TECH modal
        viewEditTech ? (
          <TechAdd
            openingHookSetter={setViewEditTech}
            handleSaveTech={handleSaveTech}
            currentTech={currentTech}
            title="Edit technology"
            showSubmit={true}
            formType={"EDIT"}
          />
        ) : (
          ""
        )
      }
      {
        //view VIEW TECH modal
        viewViewTech ? (
          <TechAdd
            openingHookSetter={setViewViewTech}
            setViewViewTech={setViewViewTech}
            title="View technology"
            showSubmit={false}
            currentTech={currentTech}
            formType={"VIEW"}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Technologies</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
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
        <h4 className="empty">No techs to display</h4>
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

export default Techs;
