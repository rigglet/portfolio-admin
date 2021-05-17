import styled from "styled-components";

const ListItem = (props) => {
  const { children, handleItemClick } = props;

  return (
    <StyledListItem onClick={() => handleItemClick(children)}>
      <h4>{children.name}</h4>
      <p>{children.description}</p>
      <p>{children.type}</p>
    </StyledListItem>
  );
};

export default ListItem;

const StyledListItem = styled.div`
  border: 1px solid #313131;
  width: 100%;
  //height: 10%;
  padding: 0.25rem;
  border-radius: 4px;
  background-color: white;
  color: #313131;
  cursor: pointer;
`;
