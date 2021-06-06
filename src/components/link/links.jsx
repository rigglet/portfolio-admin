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
  const [currentLink, setCurrentLink] = useState({
    name: "",
    type: "",
    address: "",
    icon: "",
  });
  const [viewViewLink, setViewViewLink] = useState(false);
  const [viewAddLink, setViewAddLink] = useState(false);
  const [viewEditLink, setViewEditLink] = useState(false);

  const notify = (type) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Link EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Link ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Link DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE SAVE LINK
  const handleSaveLink = async () => {
    const addLink = async () => {
      return await postData(auth, "links", currentLink);
    };

    addLink()
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
        setCurrentLink({
          name: "",
          type: "",
          address: "",
          icon: "",
        });
      });
  };

  //HANDLE EDIT LINK
  const handleEditLink = async (data) => {
    const editLink = async () => {
      return await updateData(auth, "links", currentLink);
    };

    editLink()
      .then((result) => {
        //Toast message
        notify("EDITED", result.status, result._id);
        return result;
      })
      .then((result) => {
        setLinks([
          ...links.filter((p) => p._id !== currentLink._id),
          currentLink,
        ]);
      })
      .then(() => {
        setViewEditLink(false);
        setCurrentLink({
          name: "",
          type: "",
          address: "",
          icon: "",
        });
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
        viewAddLink && (
          <LinkAdd
            openingHookSetter={setViewAddLink}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            handleSaveLink={handleSaveLink}
            handleEditLink={handleEditLink}
            title="Add new link"
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT LINK modal
        viewEditLink && (
          <LinkAdd
            openingHookSetter={setViewEditLink}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            handleSaveLink={handleSaveLink}
            handleEditLink={handleEditLink}
            title="Edit link"
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW LINK modal
        viewViewLink && (
          <LinkAdd
            openingHookSetter={setViewViewLink}
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            handleSaveLink={handleSaveLink}
            handleEditLink={handleEditLink}
            title="View link"
            formType={"VIEW"}
          />
        )
      }
      <div className="header">
        <h1>Links</h1>
        <div className="toolbar">
          <RiAddCircleLine
            className="header-icon"
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
`;

export default Links;
