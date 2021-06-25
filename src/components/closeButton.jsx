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
  top: 2rem;
  right: 2rem;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 1.8rem;
  color: #920000;
  background-color: #ebebeb;

  &:hover {
    color: #0c395e;
    transition: 0.3s;
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    top: 1rem;
    right: 1rem;
    font-size: 1.6rem;
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
