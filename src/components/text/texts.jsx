import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import TextList from "./textList";
import TextAdd from "./textAddViewEdit";
//data
import { deleteData, postData, updateData } from "../../api/api";

function Texts({ auth, texts, setTexts }) {
  const [currentText, setCurrentText] = useState({ name: "", content: "" });
  const [viewViewText, setViewViewText] = useState(false);
  const [viewAddText, setViewAddText] = useState(false);
  const [viewEditText, setViewEditText] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Text EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Text ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`TextDELETED successfully`);
        break;
      case "EDIT_ERROR":
        toast.dark(`Error EDITING text: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING text: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING text: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD TEXT
  const handleSaveText = async () => {
    setFetchingData(true);

    const addText = async () => {
      return await postData(auth, "texts", currentText);
    };

    addText()
      .then((result) => {
        if (result.status === 200) {
          setTexts([...texts, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentText({ name: "", content: "" });
        setViewAddText(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE ADD TEXT
  const handleEditText = async () => {
    setFetchingData(true);

    const editText = async () => {
      return await updateData(auth, "texts", currentText);
    };

    editText()
      .then((result) => {
        if (result.status === 200) {
          setTexts([
            ...texts.filter((p) => p._id !== currentText._id),
            currentText,
          ]);
          //Toast message
          notify("EDITED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentText({ name: "", content: "" });
        setViewEditText(false);
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

    const deleteText = async () => {
      return await deleteData(auth, "texts", id);
    };

    deleteText()
      .then((result) => {
        if (result.status === 200) {
          setTexts([...texts.filter((p) => p._id !== id)]);
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
  const handleViewEditRecord = (text) => {
    setCurrentText({ ...currentText, ...text });
  };

  return (
    <StyledTexts>
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
        //view ADD TEXT modal
        viewAddText && (
          <TextAdd
            openingHookSetter={setViewAddText}
            currentText={currentText}
            setCurrentText={setCurrentText}
            handleSaveText={handleSaveText}
            handleEditText={handleEditText}
            fetchingData={fetchingData}
            title="Add new text"
            formType={"ADD"}
          />
        )
      }

      {
        //view EDIT TEXT modal
        viewEditText && (
          <TextAdd
            openingHookSetter={setViewEditText}
            currentText={currentText}
            setCurrentText={setCurrentText}
            handleSaveText={handleSaveText}
            handleEditText={handleEditText}
            fetchingData={fetchingData}
            title="Edit text"
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW TEXT modal
        viewViewText && (
          <TextAdd
            openingHookSetter={setViewViewText}
            currentText={currentText}
            setCurrentText={setCurrentText}
            title="View text"
            formType={"VIEW"}
          />
        )
      }
      <div className="header">
        <h1>Texts</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="header-icon"
            onClick={() => setViewAddText(true)}
          />
        </div>
      </div>
      {texts.length > 0 ? (
        <TextList
          texts={texts}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditText={setViewEditText}
          setViewViewText={setViewViewText}
          deletingData={deletingData}
          clickedItem={clickedItem}
        />
      ) : (
        <h4 className="empty">No texts to display</h4>
      )}
    </StyledTexts>
  );
}

const StyledTexts = styled(motion.div)`
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

export default Texts;
