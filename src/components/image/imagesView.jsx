import styled from "styled-components";
import { motion } from "framer-motion";
//image gallery
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
//components
import CloseButton from "../closeButton";
//server base url
import { baseURL as SERVER_BASE_URL, imagePath } from "../../config/config";

const ImagesView = function ({ openingHookSetter, images }) {
  const imageArray = images.map((image) => {
    return {
      original: `${SERVER_BASE_URL()}/${imagePath()}/${image.fileName}`,
      thumbnail: `${SERVER_BASE_URL()}/${imagePath()}/${image.fileName}`,
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
          //showBullets={true}
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
    height: 80vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    display: flex;
    align-items: center;
    justify-content: center;

    .image-gallery {
      height: 70vh;
      width: auto;
    }
    .image-gallery-thumbnails-container {
      max-width: 65vw;
    }
    .image-gallery-thumbnails-container img {
      height: 100px;
      object-fit: scale-down;
    }

    .image-gallery-slide {
      height: 55vh;
      //background: white;
    }
    .image-gallery-slide img {
      height: 400px;
      object-fit: scale-down;
      object-position: center center;
    }

    //fullscreen view
    .fullscreen .image-gallery-slide {
      height: 80vh;
    }
    .fullscreen .image-gallery-slide img {
      height: 80vh;
    }
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    top: 0vh;
    left: 0vw;

    .container {
      width: 100vw;
      height: 100vh;
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    width: 100vw;
    height: 100vh;
    top: 0vh;
    left: 0vw;

    .container {
      width: 95vw;
      height: 95vh;

      .image-gallery {
        height: 90vh;
        width: auto;
      }
      .image-gallery-thumbnails-container {
        max-width: 90vw;
      }
      .image-gallery-thumbnails-container img {
        height: 100%;
        object-fit: scale-down;
      }

      .image-gallery-slide {
        height: 55vh;
        //background: white;
      }
      .image-gallery-slide img {
        height: 100%;
        object-fit: scale-down;
        object-position: center center;
      }

      //fullscreen view
      .fullscreen .image-gallery-slide {
        height: 60vh;
      }
      .fullscreen .image-gallery-slide img {
        height: 80vh;
      }
    }
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

export default ImagesView;
