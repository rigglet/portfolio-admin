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
    color: "",
  });
  const [viewViewLink, setViewViewLink] = useState(false);
  const [viewAddLink, setViewAddLink] = useState(false);
  const [viewEditLink, setViewEditLink] = useState(false);
  //hooks to manage state for showing hiding spinner when fetching / deleting data
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
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
      case "EDIT_ERROR":
        toast.dark(`Error EDITING link: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING link: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING link: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE SAVE LINK
  const handleSaveLink = async () => {
    setFetchingData(true);

    const addLink = async () => {
      return await postData(auth, "links", currentLink);
    };

    addLink()
      .then((result) => {
        if (result.status === 200) {
          setLinks([...links, result.data]);
          //Toast message
          notify("ADDED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentLink({
          name: "",
          type: "",
          address: "",
          icon: "",
          color: "",
        });
        setViewAddLink(false);
      })
      .catch((err) => {
        notify("ADD_ERROR", err);
        setFetchingData(false);
      });
  };

  //HANDLE EDIT LINK
  const handleEditLink = async (data) => {
    const editLink = async () => {
      return await updateData(auth, "links", currentLink);
    };

    editLink()
      .then((result) => {
        if (result.status === 200) {
          //set link state
          setLinks([
            ...links.filter((p) => p._id !== currentLink._id),
            currentLink,
          ]);
        }
        //Toast message
        notify("EDITED");
      })
      .then(() => {
        setFetchingData(false);
        setCurrentLink({
          name: "",
          type: "",
          address: "",
          icon: "",
          color: "",
        });
        setViewEditLink(false);
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

    const deleteLink = async () => {
      return await deleteData(auth, "links", id);
    };

    deleteLink()
      .then((result) => {
        if (result.status === 200) {
          setLinks([...links.filter((p) => p._id !== id)]);
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
  const handleViewEditRecord = (link) => {
    setCurrentLink({ ...currentLink, ...link });
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
            fetchingData={fetchingData}
            title="Add new link"
            formType={"ADD"}
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
            fetchingData={fetchingData}
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
          deletingData={deletingData}
          clickedItem={clickedItem}
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

export default Links;
