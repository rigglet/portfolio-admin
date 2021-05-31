import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import ImageItem from "./imageItem";

function ImageList({
  images,
  setViewEditImage,
  setViewViewImage,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
}) {
  return (
    <StyledImageList>
      {images.length > 0 && (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="short-header">Description</h4>
            <h4 className="long-header">Filename</h4>
            <h4 className="short-header">Category</h4>
            <h4 className="actions-header">Actions</h4>
          </li>
          {images
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((image) => {
              return (
                <ImageItem
                  key={uuidv4()}
                  image={image}
                  declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditImage={setViewEditImage}
                  setViewViewImage={setViewViewImage}
                  handleViewEditRecord={handleViewEditRecord}
                />
              );
            })}
        </ul>
      )}
    </StyledImageList>
  );
}

const StyledImageList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  ul {
    width: auto;
    height: 80vh;
    list-style: none;
  }

  .headers {
    display: flex;
    gap: 0.25rem;

    h4 {
      background-color: #688297;
      padding: 0.25rem 0.5rem;
      font-weight: 500;
      color: white;
      text-align: left;
      display: flex;
      align-items: center;
      cursor: default;
    }
  }
  .name-header {
    flex: 0 0 20%;
  }
  .short-header {
    flex: 0 0 15%;
    //justify-content: center;
    text-align: left;
  }
  .actions-header {
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
`;

export default ImageList;
