import styled from "styled-components";

const ListItem = (props) => {
  const { children, handleItemClick } = props;

  return (
    <StyledListItem onClick={() => handleItemClick(children)}>
      {children.name}
    </StyledListItem>
  );
};

export default ListItem;

const StyledListItem = styled.div`
  width: 100%;
  border: 1px solid #0c395e;
  padding: 0.25rem;
  cursor: pointer;
`;
