import styled from "styled-components";
import { motion } from "framer-motion";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//components
import TextItem from "./textItem";

function TextList({
  texts,
  setViewEditText,
  setViewViewText,
  declineFnc,
  acceptFnc,
  handleViewEditRecord,
}) {
  return (
    <StyledTextList>
      {texts.length > 0 && (
        <ul>
          <li key={uuidv4()} className="headers">
            <h4 className="name-header">Name</h4>
            <h4 className="long-header">content</h4>
            <h4 className="short-header">Actions</h4>
          </li>
          {texts
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((text) => {
              return (
                <TextItem
                  key={uuidv4()}
                  text={text}
                  declineFnc={declineFnc}
                  acceptFnc={acceptFnc}
                  setViewEditText={setViewEditText}
                  setViewViewText={setViewViewText}
                  handleViewEditRecord={handleViewEditRecord}
                />
              );
            })}
        </ul>
      )}
    </StyledTextList>
  );
}

const StyledTextList = styled(motion.div)`
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
    }
  }
  .name-header {
    flex: 0 0 20%;
  }
  .short-header {
    flex: 0 0 10%;
    justify-content: center;
  }
  .long-header {
    flex-grow: 1;
    text-align: left;
  }
`;

export default TextList;
