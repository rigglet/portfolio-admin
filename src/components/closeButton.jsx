import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

export default function closeButton({
  closeFunction,
  resetFunction,
  resetObject,
}) {
  return (
    <StyledClose
      type="button"
      onClick={() => {
        closeFunction(false);
        if (typeof resetFunction === "function") resetFunction(resetObject);
      }}
    >
      <AiFillCloseCircle />
    </StyledClose>
  );
}

const StyledClose = styled.button`
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.2rem;
  height: 2.2rem;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: bold;
  color: #920000;
  background-color: #ebebeb;

  &:hover {
    color: #0c395e;
    //background: #0c395e;
    transition: 0.3s;
  }
`;
