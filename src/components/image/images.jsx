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

function Images({ auth, images, setImages, projects, setProjects }) {
  const [currentImage, setCurrentImage] = useState({
    name: "",
    description: "",
    file: {},
  });
  const [viewViewImage, setViewViewImage] = useState(false);
  const [viewAddImage, setViewAddImage] = useState(false);
  const [viewEditImage, setViewEditImage] = useState(false);
  const [viewAllImages, setViewAllImages] = useState(false);
  const [deletingData, setDeletingData] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const notify = (type, err) => {
    switch (type) {
      case "NOTADDED":
        toast.dark(`ERROR: Image not added`);
        break;
      case "ADDED":
        toast.dark(`Project image ADDED successfully`);
        break;
      case "EDITED":
        toast.dark(`Project image EDITED successfully`);
        break;
      case "NOIMAGE":
        toast.dark(`Please select a project image!`);
        break;
      case "DELETED":
        toast.dark(`Project image DELETED successfully`);
        break;
      case "EDIT_ERROR":
        toast.dark(`Error EDITING image: ${err.message}`);
        break;
      case "ADD_ERROR":
        toast.dark(`Error ADDING image: ${err.message}`);
        break;
      case "DELETE_ERROR":
        toast.dark(`Error DELETING image: ${err.message}`);
        break;
      default:
        toast.dark("Nothing to report");
    }
  };

  //HANDLE ADD IMAGE
  const handleSaveImage = async () => {
    setFetchingData(true);

    const formData = new FormData();

    //TODO: check if file before save etc
    //check if file selected
    if (currentImage.file?.name !== undefined) {
      //append form data
      formData.append("_id", currentImage._id);
      formData.append("name", currentImage.name);
      formData.append("description", currentImage.description);
      formData.append("category", "project");
      formData.append(
        "projectImage",
        currentImage.file,
        currentImage.file.name
      );

      const addImage = async () => {
        return await postData(auth, "images", formData);
      };

      addImage()
        .then((result) => {
          if (result.status === 200) {
            setImages([...images, result.data]);
            //Toast message
            notify("ADDED");
          }
        })
        .then(() => {
          setFetchingData(false);
          setCurrentImage({
            name: "",
            description: "",
            file: {},
          });
          setViewAddImage(false);
        })
        .catch((err) => {
          notify("ADD_ERROR", err);
          setFetchingData(false);
        });
    } else {
      setFetchingData(false);
      notify("NOIMAGE");
    }
  };

  //HANDLE EDIT IMAGE
  const handleEditImage = async () => {
    setFetchingData(true);
    const editImage = async () => {
      return await updateData(auth, "images", currentImage);
    };

    editImage()
      .then((result) => {
        if (result.status === 200) {
          //update image state
          setImages([
            ...images.filter((t) => t._id !== currentImage._id),
            currentImage,
          ]);

          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              screenshots: [
                ...project.screenshots.map((image) => {
                  if (image._id === currentImage._id) {
                    return currentImage;
                  } else {
                    return image;
                  }
                }),
              ],
            }))
          );

          //Toast message
          notify("EDITED");
        }
      })
      .then(() => {
        setFetchingData(false);
        setCurrentImage({
          name: "",
          description: "",
          file: {},
        });
        setViewEditImage(false);
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

    const deleteImage = async () => {
      return await deleteData(auth, "images", id);
    };

    deleteImage()
      .then((result) => {
        if (result.status === 200) {
          //set image state
          setImages([...images.filter((t) => t._id !== id)]);
          //update project state
          setProjects(
            projects.map((project) => ({
              ...project,
              screenshots: [
                ...project.screenshots.filter((image) => image._id !== id),
              ],
            }))
          );
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
  const handleViewEditRecord = (image) => {
    setCurrentImage({ ...currentImage, ...image });
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
            fetchingData={fetchingData}
            title="Add new image"
            formType={"ADD"}
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
            fetchingData={fetchingData}
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
            title="View image"
            formType={"VIEW"}
          />
        )
      }

      <div className="header">
        <h1>Images</h1>
        <div className="toolbar">
          <ImImages
            className="header-icon"
            onClick={() => setViewAllImages(true)}
          />
          <RiAddCircleLine
            className="header-icon"
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
          deletingData={deletingData}
          clickedItem={clickedItem}
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

export default Images;
