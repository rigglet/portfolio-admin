import styled from "styled-components";

export default function submitButton(props) {
  let handleClickFunction = {};
  if (props.type === "NEW") handleClickFunction = props.saveFunction;
  else handleClickFunction = props.editFunction;

  return (
    <StyledSubmit
      type="button"
      className="submitBut"
      onClick={handleClickFunction}
      value="Save"
    />
  );
}

const StyledSubmit = styled.input`
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

  &:hover {
    color: white;
    background: #0c395e;
    transition: 0.3s;
  }
`;
