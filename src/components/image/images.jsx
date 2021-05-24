import { useState } from "react";
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
import { deleteData, postData, updateData } from "../../api/api";

function Images({ auth, images, setImages }) {
  const [currentImage, setCurrentImage] = useState({
    name: "",
    description: "",
    file: {},
  });
  const [viewViewImage, setViewViewImage] = useState(false);
  const [viewAddImage, setViewAddImage] = useState(false);
  const [viewEditImage, setViewEditImage] = useState(false);
  const [viewAllImages, setViewAllImages] = useState(false);

  const notify = (type) => {
    switch (type) {
      case "SERVER_ERR":
        toast.warning(`Internal Server error: Project not saved.`);
        break;
      case "EDITED":
        toast.dark(`Project SAVED`);
        break;
      case "ADDED":
        toast.dark(`Project image ADDED successfully`);
        break;
      case "NOIMAGE":
        toast.dark(`Please select a project image!`);
        break;
      case "DELETED":
        toast.dark(`Project image DELETED successfully`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD IMAGE
  const handleSaveImage = async () => {
    const formData = new FormData();

    //append form data
    formData.append("_id", currentImage._id);
    formData.append("name", currentImage.name);
    formData.append("description", currentImage.description);
    formData.append("category", "project");
    formData.append("projectImage", currentImage.file, currentImage.file.name);

    const addImage = async () => {
      return await postData(auth, "images", formData);
    };

    addImage()
      .then((result) => {
        //     //Toast message
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

  //HANDLE EDIT IMAGE
  const handleEditImage = async () => {
    const editImage = async () => {
      return await updateData(auth, "images", currentImage);
    };

    editImage()
      .then((result) => {
        //Toast message
        notify("EDITED", result.status, result._id);
        return result;
      })
      .then(() => {
        setImages([
          ...images.filter((t) => t._id !== currentImage._id),
          currentImage,
        ]);
      })
      .then(() => {
        setViewEditImage(false);
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
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            handleSaveImage={handleSaveImage}
            handleEditImage={handleEditImage}
            title="Add new image"
            formType={"NEW"}
          />
        )
      }

      {
        //view EDIT IMAGE modal
        viewEditImage && (
          <ImageAdd
            openingHookSetter={setViewEditImage}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            handleSaveImage={handleSaveImage}
            handleEditImage={handleEditImage}
            title="Edit image details"
            formType={"EDIT"}
          />
        )
      }
      {
        //view VIEW IMAGE modal
        viewViewImage && (
          <ImageAdd
            openingHookSetter={setViewViewImage}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
            handleSaveImage={handleSaveImage}
            handleEditImage={handleEditImage}
            title="View image"
            formType={"VIEW"}
          />
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
