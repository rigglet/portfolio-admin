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
import { set } from "react-hook-form";

function Texts({ auth, texts, setTexts }) {
  const [currentText, setCurrentText] = useState({ name: "", content: "" });
  const [viewViewText, setViewViewText] = useState(false);
  const [viewAddText, setViewAddText] = useState(false);
  const [viewEditText, setViewEditText] = useState(false);

  const notify = (type) => {
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
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD TEXT
  const handleSaveText = async () => {
    const addText = async () => {
      return await postData(auth, "texts", currentText);
    };

    addText()
      .then((result) => {
        //Toast message
        notify("ADDED", result.status, result.data._id);
        return result;
      })
      .then((result) => {
        setTexts([...texts, result.data]);
      })
      .then(() => {
        setViewAddText(false);
        setCurrentText({ name: "", content: "" });
      });
  };

  //HANDLE ADD TEXT
  const handleEditText = async () => {
    const editText = async () => {
      return await updateData(auth, "texts", currentText);
    };

    editText()
      .then((result) => {
        //Toast message
        notify("EDITED", result.status, result._id);
        return result;
      })
      .then((result) => {
        setTexts([
          ...texts.filter((p) => p._id !== currentText._id),
          currentText,
        ]);
      })
      .then(() => {
        setViewEditText(false);
        setCurrentText({ name: "", content: "" });
      });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteText = async () => {
      return await deleteData(auth, "texts", id);
    };

    deleteText()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setTexts([...texts.filter((p) => p._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (text) => {
    setCurrentText(text);
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
            title="Add new text"
            formType={"NEW"}
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
            handleSaveText={handleSaveText}
            handleEditText={handleEditText}
            title="View text"
            formType={"VIEW"}
          />
        )
      }
      <div className="header">
        <h1>Texts</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
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

export default Texts;
