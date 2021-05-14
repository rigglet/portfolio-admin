import { useState, useEffect } from "react";
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
import { getData, deleteData, postData, updateData } from "../../api/api";

function Texts({ auth }) {
  const [texts, setTexts] = useState({});
  const [currentText, setCurrentText] = useState(null);
  const [viewViewText, setViewViewText] = useState(false);
  const [viewAddText, setViewAddText] = useState(false);
  const [viewEditText, setViewEditText] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Text EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Text ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Text ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  useEffect(() => {
    async function getTable() {
      return await getData(auth, "texts");
    }
    getTable().then((result) => {
      if (result.status === 200) {
        setTexts(result.data);
      }
    });
  }, []);

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveText = async (data) => {
    const editText = async () => {
      return await updateData(auth, "texts", data);
    };

    const addText = async () => {
      return await postData(auth, "texts", data);
    };

    data?.formtype === "EDIT"
      ? editText()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then((result) => {
            setTexts([...texts.filter((p) => p._id !== data._id), data]);
          })
          .then(() => {
            setViewEditText(false);
          })
      : addText()
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
        viewAddText ? (
          <TextAdd
            openingHookSetter={setViewAddText}
            handleSaveText={handleSaveText}
            title="Add new text"
            showSubmit={true}
            formType={"NEW"}
          />
        ) : (
          ""
        )
      }

      {
        //view EDIT TEXT modal
        viewEditText && (
          <TextAdd
            openingHookSetter={setViewEditText}
            handleSaveText={handleSaveText}
            currentText={currentText}
            title="Edit text"
            showSubmit={true}
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW TEXT modal
        viewViewText && (
          <TextAdd
            openingHookSetter={setViewViewText}
            text={currentText}
            setViewViewText={setViewViewText}
            title="View text"
            showSubmit={false}
            currentText={currentText}
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
