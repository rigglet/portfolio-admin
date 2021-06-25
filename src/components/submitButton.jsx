import styled from "styled-components";
import { FaRegSave } from "react-icons/fa";

export default function submitButton({ type, saveFunction, editFunction }) {
  let handleClickFunction = {};
  if (type === "NEW" || type === "ADD") handleClickFunction = saveFunction;
  else handleClickFunction = editFunction;

  return (
    <StyledSubmit type="button" onClick={handleClickFunction}>
      <FaRegSave />
      Save
    </StyledSubmit>
  );
}

const StyledSubmit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  color: #0c395e;
  border: 2px solid #0c395e;
  padding: 0.25rem;
  font-size: 14pt;
  font-variant-caps: all-small-caps;
  outline: solid 3px transparent;
  width: 100px;
  height: 40px;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 4px;

  &:hover {
    color: white;
    background: #0c395e;
    transition: 0.3s;
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
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
