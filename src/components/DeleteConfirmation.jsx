import styled from "styled-components";

const DeleteConfirmation = (props) => {
  const { declineFnc, acceptFnc, setViewDelete, id, referringType } = props;

  return (
    <StyledDeleteConfirmation onClick={() => setViewDelete(false)}>
      <div className="box">
        <div className="message">
          {referringType === "PROJECT" && (
            <p>
              Warning: Deleting Project elements will remove them from active
              projects!
            </p>
          )}
          <p>
            Delete <span>{id}</span>?
          </p>
        </div>
        <div className="options">
          <button onClick={declineFnc} className="no">
            No
          </button>
          <button onClick={() => acceptFnc(id)} className="yes">
            Yes
          </button>
        </div>
      </div>
    </StyledDeleteConfirmation>
  );
};

const StyledDeleteConfirmation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    /* position: relative;
    top: 0;
    right: 0vw; */
    width: auto;
    height: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    column-gap: 0.5rem;
    row-gap: 1rem;
    background-color: rgba(256, 256, 256, 1);
    border: 1px solid #0c395e;
    border-radius: 4px;
    box-shadow: 0 0 3px 3px rgb(12, 57, 94, 0.5);

    .message {
      font-weight: bold;
      span {
        font-weight: 400;
        font-size: smaller;
      }
    }

    .options {
      display: flex;
      column-gap: 1rem;

      button {
        //border-radius: 4px;
        padding: 0.25rem;
        font-size: 12pt;
        font-variant-caps: all-small-caps;
        outline: solid 3px transparent;
        cursor: pointer;
        align-self: flex-end;
        &.yes {
          color: #0c395e;
          border: 3px solid #0c395e;
        }
        &.no {
          color: #0c395e;
          border: 3px solid #0c395e;
        }
        &.no:hover {
          color: white;
          background-color: #d65b5b;
          transition: 0.3s;
        }
        &.yes:hover {
          color: white;
          background-color: #306839;
          transition: 0.3s;
        }
      }
    }
  }
`;

export default DeleteConfirmation;
