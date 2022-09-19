import styled from "styled-components";

const Spinner = ({ size, alignment }) => {
  return <StyledSpinner size={size} alignment={alignment} />;
};

const StyledSpinner = styled.div`
  //height: 20px;
  //width: 20px;
  //alignment: flex-start / flex-end / center
  align-self: ${({ alignment }) => (alignment ? alignment : "center")};
  width: ${({ size }) => (size ? size : "20px")};
  height: ${({ size }) => (size ? size : "20px")};
  border-top: 5px solid #474747;
  border-right: 5px solid #689ed0;
  border-bottom: 5px solid #474747;
  border-left: 5px solid #689ed0;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
