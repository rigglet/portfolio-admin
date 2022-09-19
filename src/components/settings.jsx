import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { FiSettings, FiDatabase } from "react-icons/fi";
import { FaMapPin } from "react-icons/fa";
import { BsBucket } from "react-icons/bs";
import { AiOutlineNumber } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
//components
import CloseButton from "./closeButton";

function Settings({
  auth,
  setAuth,
  openingHookSetter,
  title,
  formType,
  settings,
  setSettings,
}) {
  return (
    <StyledSettings>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setSettings}
          resetObject={settings}
        />

        <div className="titleHeader">
          <FiSettings className="titleIcon" />
          <h1>{title} </h1>
        </div>

        <div className="form-information">
          <div className="input-item">
            <label htmlFor="username">Username:</label>
            <div className="address-item">
              <CgProfile className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="username"
                autoComplete="off"
                value={auth?.username}
                onChange={(e) =>
                  setSettings({
                    ...auth,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="port">Port:</label>
            <div className="address-item">
              <AiOutlineNumber className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="address"
                autoComplete="off"
                value={settings?.port}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="input-item">
            <label htmlFor="address">Database:</label>
            <div className="address-item">
              <FiDatabase className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="address"
                autoComplete="off"
                //size="50"
                value={settings?.database}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="bucketName">Bucket Name:</label>
            <div className="address-item">
              <BsBucket className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="bucketName"
                autoComplete="off"
                value={settings?.bucketName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="bucketRegion">Bucket Region:</label>
            <div className="address-item">
              <FaMapPin className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="bucketRegion"
                autoComplete="off"
                value={settings?.bucketRegion}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* {formType !== "VIEW" && (
            <SubmitButton
              type={formType}
              editFunction={handleEditSettings}
              saveFunction={handleSaveSettings}
            />
          )} */}
        </div>
      </div>
    </StyledSettings>
  );
}

const StyledSettings = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: 0vh;
  left: 0vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 40vw;
    height: 65vh;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    padding: 2rem;

    .form-information {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      .address-item {
        display: flex;
        column-gap: 0.25rem;
        align-items: center;
        .address-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      .input-item {
        display: flex;
        flex-direction: column;
      }
      label {
        font-weight: bold;
        font-size: 12pt;
        font-variant-caps: all-small-caps;
        margin-bottom: 0.5rem;
      }

      input[type="text"] {
        width: 100%;
        color: #0c395e;
        resize: none;
        outline: solid 3px transparent;
        border-radius: 4px;
        padding: 0.25rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 10pt;
        border: 1px solid #313131;
      }

      input[type="text"]:focus {
        outline: solid 3px #688297;
        border-color: transparent;
      }
    }
  }

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    .container {
      width: 90vw;
      height: 70vh;
      padding: 1rem;
    }
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

export default Settings;
