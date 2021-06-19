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
  align-items: center;
  justify-content: center;
  column-gap: 1rem;

  img {
    cursor: pointer;
    height: auto;
    max-width: 425px;
    object-fit: scale-down;
    object-position: center center;
  }

  .mainImage-icon {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    &.selected {
      color: green;
    }
    &.unselected {
      color: grey;
    }
  }
`;
