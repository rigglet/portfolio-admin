import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import LinkList from "./linkList";
import LinkAdd from "./linkAddViewEdit";
//data
import { deleteData, postData, updateData } from "../../api/api";

function Links({ auth, links, setLinks }) {
  //const [links, setLinks] = useState({});
  const [currentLink, setCurrentLink] = useState(null);
  const [viewViewLink, setViewViewLink] = useState(false);
  const [viewAddLink, setViewAddLink] = useState(false);
  const [viewEditLink, setViewEditLink] = useState(false);

  const notify = (type, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Link EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Link ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Link ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveLink = async (data) => {
    const editLink = async () => {
      return await updateData(auth, "links", data);
    };

    const addLink = async () => {
      return await postData(auth, "links", data);
    };

    data?.formtype === "EDIT"
      ? editLink()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then((result) => {
            setLinks([...links.filter((p) => p._id !== data._id), data]);
          })
          .then(() => {
            setViewEditLink(false);
          })
      : addLink()
          .then((result) => {
            //Toast message
            notify("ADDED", result.status, result.data._id);
            return result;
          })
          .then((result) => {
            setLinks([...links, result.data]);
          })
          .then(() => {
            setViewAddLink(false);
          });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteLink = async () => {
      return await deleteData(auth, "links", id);
    };

    deleteLink()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setLinks([...links.filter((p) => p._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (link) => {
    setCurrentLink(link);
  };

  return (
    <StyledLinks>
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
        //view ADD LINK modal
        viewAddLink ? (
          <LinkAdd
            openingHookSetter={setViewAddLink}
            handleSaveLink={handleSaveLink}
            title="Add new link"
            showSubmit={true}
            formType={"NEW"}
          />
        ) : (
          ""
        )
      }

      {
        //view EDIT LINK modal
        viewEditLink ? (
          <LinkAdd
            openingHookSetter={setViewEditLink}
            handleSaveLink={handleSaveLink}
            currentLink={currentLink}
            title="Edit link"
            showSubmit={true}
            formType={"EDIT"}
          />
        ) : (
          ""
        )
      }
      {
        //view VIEW LINK modal
        viewViewLink ? (
          <LinkAdd
            openingHookSetter={setViewViewLink}
            link={currentLink}
            setViewViewLink={setViewViewLink}
            title="View link"
            showSubmit={false}
            currentLink={currentLink}
            formType={"VIEW"}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Links</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="h-icon"
            onClick={() => setViewAddLink(true)}
          />
        </div>
      </div>
      {links.length > 0 ? (
        <LinkList
          links={links}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditLink={setViewEditLink}
          setViewViewLink={setViewViewLink}
        />
      ) : (
        <h4 className="empty">No links to display</h4>
      )}
    </StyledLinks>
  );
}

const StyledLinks = styled(motion.div)`
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

export default Links;
