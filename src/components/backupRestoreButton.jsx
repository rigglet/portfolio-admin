import styled from "styled-components";
import { FaDownload, FaUpload } from "react-icons/fa";

export default function backupRestoreButton({
  type,
  backupFunction,
  restoreFunction,
}) {
  let handleClickFunction = {};
  if (type === "BACKUP") handleClickFunction = backupFunction;
  else handleClickFunction = restoreFunction;

  return (
    <StyledSubmit type="button" onClick={handleClickFunction}>
      {type === "BACKUP" ? (
        <>
          <FaDownload className="button-icon" />
          Backup
        </>
      ) : (
        <>
          <FaUpload className="button-icon" />
          Restore
        </>
      )}
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
  width: 150px;
  height: 40px;
  cursor: pointer;
  align-self: flex-end;
  border-radius: 4px;

  .button-icon {
    width: 20px;
    height: 20px;
  }

  &:hover {
    color: white;
    background: #0c395e;
    transition: 0.3s;
  }
`;
