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
          //Toast message
          notify("ADDED");
          return result;
        })
        .then((result) => {
          setImages([...images, result.data]);
        })
        .then(() => {
          setCurrentImage({
            name: "",
            description: "",
            file: {},
          });
          setViewAddImage(false);
        });
    } else {
      notify("NOIMAGE");
    }
  };

  //HANDLE EDIT IMAGE
  const handleEditImage = async () => {
    const editImage = async () => {
      return await updateData(auth, "images", currentImage);
    };

    editImage()
      .then(
        (result) => {
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
                  ...project.screenshots.filter(
                    (image) => image._id !== currentImage._id
                  ),
                  currentImage,
                ],
              }))
            );

            //Toast message
            notify("EDITED");
          }
        },
        (error) => {
          console.log(error);
        }
      )
      .then(() => {
        setCurrentImage({
          name: "",
          description: "",
          file: {},
        });
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
        //Toast message
        notify("DELETED");
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
`;

export default Images;
