import styled from "styled-components";
import SERVER_BASE_URL from "../../config/config";

const ImageItem = (props) => {
  const { children, handleItemClick } = props;
  return (
    <StyledImageItem onClick={() => handleItemClick(children)}>
      <img
        src={`${SERVER_BASE_URL()}/public/uploads/${children.fileName}`}
        alt={children.description}
      />
    </StyledImageItem>
  );
};

export default ImageItem;

const StyledImageItem = styled.div`
  cursor: pointer;
  img {
    height: auto;
    width: 425px;
    object-fit: contain;
    object-position: center center;
  }
`;
