import styled from "styled-components";
import Icon from "../Icon";

const ListItem = (props) => {
  const { children, handleItemClick, allIcons } = props;

  return (
    <StyledListItem onClick={() => handleItemClick(children)}>
      <Icon
        icon={children.icon}
        color={children.color}
        size="100px"
        title={children.description}
        className="item-icon"
        allIcons={allIcons}
      />
      <h4>{children.name}</h4>
      {/* <p>{children.description}</p>
      <p>{children.type}</p> */}
    </StyledListItem>
  );
};

export default ListItem;

const StyledListItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #313131;
  //max-width: 120px;
  //height: 100px;
  //height: auto;
  padding: 0.75rem;
  border-radius: 8px;
  background-color: white;
  color: #313131;
  cursor: pointer;

  .item-icon {
    width: 4rem;
    height: 4rem;
  }
`;
