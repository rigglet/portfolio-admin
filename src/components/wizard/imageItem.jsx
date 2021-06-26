import styled from "styled-components";
import { baseURL as SERVER_BASE_URL, imagePath } from "../../config/config";
import { FaRegCheckCircle } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImageItem = (props) => {
  const {
    children,
    handleItemClick,
    selectable,
    handleMainImageSelect,
    mainImage,
  } = props;

  return (
    <StyledImageItem>
      <img
        onClick={() => handleItemClick(children)}
        src={`${SERVER_BASE_URL()}/${imagePath()}/${children.fileName}`}
        alt={children.description}
      />
      {selectable &&
        (mainImage?._id === children._id ? (
          <FaRegCheckCircle className="mainImage-icon selected" />
        ) : (
          <AiOutlineCloseCircle
            className="mainImage-icon unselected"
            onClick={() => handleMainImageSelect(children)}
          />
        ))}
    </StyledImageItem>
  );
};

export default ImageItem;

const StyledImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  position: relative;

  img {
    height: auto;
    max-width: 100%;
    cursor: pointer;
    object-fit: scale-down;
    object-position: center center;
  }

  .mainImage-icon {
    position: absolute;
    top: 1rem;
    left: 1rem;
    height: 3rem;
    width: auto;
    cursor: pointer;
    &.selected {
      color: green;
    }
    &.unselected {
      color: grey;
    }
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    .mainImage-icon {
      height: 2rem;
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
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
