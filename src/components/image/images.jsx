import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { RiAddCircleLine } from "react-icons/ri";
import { ImImages } from "react-icons/im";
//message components
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//components
import ImageList from "./imageList";
import ImageAdd from "./imageAddViewEdit";
import ImagesView from "./imagesView";
//data
import { getData, deleteData, postData, updateData } from "../../api/api";

function Images({ auth }) {
  const [images, setImages] = useState({});
  const [currentImage, setCurrentImage] = useState(null);
  const [viewViewImage, setViewViewImage] = useState(false);
  const [viewAddImage, setViewAddImage] = useState(false);
  const [viewEditImage, setViewEditImage] = useState(false);
  const [viewAllImages, setViewAllImages] = useState(false);

  const notify = (type, status, id) => {
    switch (type) {
      case "EDITED":
        toast.dark(`Status: ${status} => Image EDITED successfully`);
        break;
      case "ADDED":
        toast.dark(`Status: ${status} => Image ${id} ADDED successfully`);
        break;
      case "DELETED":
        toast.dark(`Status: ${status} => Image ${id} DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  useEffect(
    () => {
      async function getTable() {
        return await getData(auth, "images");
      }
      getTable().then((result) => {
        if (result.status === 200) {
          setImages(result.data);
        }
      });
    },
    // eslint-disable-next-line
    []
  );

  //HANDLE ADD/EDIT SUBMIT
  const handleSaveImage = async (data) => {
    const editImage = async () => {
      return await updateData(auth, "images", data);
    };

    const addImage = async () => {
      return await postData(auth, "images", data);
    };

    data?.formtype === "EDIT"
      ? editImage()
          .then((result) => {
            //Toast message
            notify("EDITED", result.status, result._id);
            return result;
          })
          .then(() => {
            setImages([...images.filter((t) => t._id !== data._id), data]);
          })
          .then(() => {
            setViewEditImage(false);
          })
      : addImage()
          .then((result) => {
            //Toast message
            notify("ADDED", result.status, result.data._id);
            return result;
          })
          .then((result) => {
            setImages([...images, result.data]);
          })
          .then(() => {
            setViewAddImage(false);
          });
  };

  //HANDLE DELETE RECORD
  const handleDeleteRecord = (id) => {
    const deleteImage = async () => {
      return await deleteData(auth, "images", id);
    };

    deleteImage()
      .then((result) => {
        //Toast message
        notify("DELETED", result.status, result.data._id);
      })
      .then(() => {
        setImages([...images.filter((t) => t._id !== id)]);
      });
  };

  //HANDLE VIEW / EDIT RECORD
  const handleViewEditRecord = (image) => {
    setCurrentImage(image);
  };

  return (
    <StyledImages>
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
        //view ALL IMAGEs modal
        viewAllImages && (
          <ImagesView openingHookSetter={setViewAllImages} images={images} />
        )
      }
      {
        //view ADD IMAGE modal
        viewAddImage && (
          <ImageAdd
            openingHookSetter={setViewAddImage}
            handleSaveImage={handleSaveImage}
            title="Add new image"
            showSubmit={true}
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT IMAGE modal
        viewEditImage ? (
          <ImageAdd
            openingHookSetter={setViewEditImage}
            handleSaveImage={handleSaveImage}
            currentImage={currentImage}
            title="Edit image"
            showSubmit={true}
            formType={"EDIT"}
          />
        ) : (
          ""
        )
      }
      {
        //view VIEW IMAGE modal
        viewViewImage ? (
          <ImageAdd
            openingHookSetter={setViewViewImage}
            setViewViewImage={setViewViewImage}
            title="View image"
            showSubmit={false}
            currentImage={currentImage}
            formType={"VIEW"}
          />
        ) : (
          ""
        )
      }
      <div className="header">
        <h1>Images</h1>
        <div className="imagebar">
          <ImImages className="h-icon" onClick={() => setViewAllImages(true)} />
          <RiAddCircleLine
            className="h-icon"
            onClick={() => setViewAddImage(true)}
          />
        </div>
      </div>
      {images.length > 0 ? (
        <ImageList
          images={images}
          acceptFnc={handleDeleteRecord}
          handleViewEditRecord={handleViewEditRecord}
          setViewEditImage={setViewEditImage}
          setViewViewImage={setViewViewImage}
        />
      ) : (
        <h4 className="empty">No images to display</h4>
      )}
    </StyledImages>
  );
}

const StyledImages = styled(motion.div)`
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
    .imagebar {
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

export default Images;
