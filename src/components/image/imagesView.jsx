import styled from "styled-components";
import { motion } from "framer-motion";
//image gallery
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
//components
import CloseButton from "../closeButton";
//server base url
import serverBaseURL from "../../config/config";

const ImagesView = function ({ openingHookSetter, images }) {
  const imageArray = images.map((image) => {
    return {
      original: `${serverBaseURL()}/public/uploads/${image.fileName}`,
      thumbnail: `${serverBaseURL()}/public/uploads/${image.fileName}`,
    };
  });

  return (
    <StyledImagesView>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={null}
          resetObject={null}
        />

        <ImageGallery
          items={imageArray}
          showPlayButton={false}
          thumbnailPosition={"bottom"}
          //showIndex={true}
          //autoPlay={true}
          showBullets={true}
          showNav={false}
        />
        {/* <div className="images"></div> */}
      </div>
    </StyledImagesView>
  );
};

const StyledImagesView = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 70vw;
    height: 70vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* object-fit: contain;
    resize: both;
    overflow: hidden; */

    .image-gallery {
      max-width: 60%;
    }

    .image-gallery-slide img {
      object-fit: contain;
      resize: both;
      overflow: hidden;
      object-position: center center;
    }

    .fullscreen .image-gallery-slide img {
      max-height: 100vh;
    }
  }
`;

export default ImagesView;
