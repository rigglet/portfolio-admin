import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//dates
import { DateTime } from "luxon";
//icons
import { FaGithub, FaRegCheckCircle } from "react-icons/fa";
import { BsCardText, BsStarFill, BsCardChecklist } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { ImImages } from "react-icons/im";
import { HiCode, HiLink } from "react-icons/hi";
import { MdWeb } from "react-icons/md";
import { IoLibraryOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
//components
import CloseButton from "../closeButton";

//server base url
import { baseURL as SERVER_BASE_URL, imagePath } from "../../config/config";

const ProjectView = function ({
  currentProject,
  setCurrentProject,
  title,
  openingHookSetter,
}) {
  return (
    <StyledProjectView>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentProject}
          resetObject={{
            projectName: "",
            version: "",
            author: "",
            featured: false,
            included: false,
            website: "",
            githubLink: "",
            shortDescription: "",
            projectDescription: "",
            addedDate: DateTime.now(),
            startedDate: DateTime.now(),
            completedDate: DateTime.now(),
            libraries: [],
            packages: [],
            technologies: [],
            screenshots: [],
            mainImage: null,
            features: [],
            highlights: [],
          }}
        />

        <div className="titleHeader">
          <MdWeb className="titleIcon" />
          <h1>{title} </h1>
          <h5>{currentProject?._id}</h5>
        </div>

        <div className="form-information">
          <fieldset className="details">
            <legend>
              Details <BsCardText />
            </legend>
            <div className="subsection">
              <div className="input-item">
                <label htmlFor="projectName">Project name:</label>
                <p>{currentProject?.projectName}</p>
              </div>
              <div className="input-item">
                <label htmlFor="version">Version:</label>
                <p>{currentProject?.version}</p>
              </div>
              <div className="input-item">
                <label htmlFor="author">Author:</label>
                <p>{currentProject?.author}</p>
              </div>
            </div>
            <div className="subsection">
              <div className="input-item">
                <label htmlFor="featured">Featured:</label>
                <input
                  disabled={true}
                  checked={currentProject?.featured}
                  type="checkbox"
                  name="featured"
                  id="featured"
                />
              </div>
              <div className="input-item">
                <label htmlFor="included">Included:</label>
                <input
                  disabled={true}
                  checked={currentProject?.included}
                  type="checkbox"
                  name="included"
                  id="included"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="addresses">
            <legend>
              Addresses
              <HiLink />
            </legend>
            <div className="address-item">
              <label htmlFor="github">Github:</label>
              <div className="address">
                <FaGithub className="address-icon" />
                <p>{currentProject?.githubLink}</p>
              </div>
            </div>
            <div className="address-item">
              <label htmlFor="website">Website:</label>
              <div className="address">
                <CgWebsite className="address-icon" />
                <p>{currentProject?.website}</p>
              </div>
            </div>
          </fieldset>

          <fieldset className="dates">
            <legend>
              Dates <AiOutlineCalendar />
            </legend>
            <div className="input-item">
              <label htmlFor="started">Started:</label>
              <p>
                {DateTime.fromISO(currentProject?.startedDate)
                  .setLocale("uk")
                  .toLocaleString({
                    timeZoneName: "short",
                  })}
              </p>
            </div>
            <div className="input-item">
              <label htmlFor="started">Completed:</label>
              <p>
                {DateTime.fromISO(currentProject?.completedDate)
                  .setLocale("uk")
                  .toLocaleString({
                    timeZoneName: "short",
                  })}
              </p>
            </div>
            <div className="input-item">
              <label htmlFor="started">Added:</label>
              <p>
                {DateTime.fromISO(currentProject?.addedDate)
                  .setLocale("uk")
                  .toLocaleString({
                    timeZoneName: "short",
                  })}
              </p>
            </div>
          </fieldset>
          <fieldset className="descriptions">
            <legend>
              Descriptions
              <BiMessageSquareDetail />
            </legend>
            <div className="input-item">
              <label htmlFor="short">Short description:</label>
              <p>{currentProject?.shortDescription}</p>
            </div>
            <div className="input-item">
              <label htmlFor="description">Description:</label>
              <p>{currentProject?.projectDescription}</p>
            </div>
          </fieldset>
          <fieldset className="features">
            <legend>
              Features <BsCardChecklist />
            </legend>
            <ul>
              {currentProject.features.map((f) => (
                <li key={uuidv4()}>{f}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="highlights">
            <legend>
              Highlights <BsStarFill />
            </legend>
            <ul>
              {currentProject.highlights.map((h) => (
                <li key={uuidv4()}>{h}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="libraries">
            <legend>
              Libraries <IoLibraryOutline />
            </legend>
            <ul>
              {currentProject.libraries.map((lib) => (
                <li key={uuidv4()}>{lib.name}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="packages">
            <legend>
              Packages <GoPackage />
            </legend>
            <ul>
              {currentProject.packages.map((p) => (
                <li key={uuidv4()}>{p.name}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="technologies">
            <legend>
              Technologies <HiCode />
            </legend>
            <ul>
              {currentProject.technologies.map((t) => (
                <li key={uuidv4()}>{t.name}</li>
              ))}
            </ul>
          </fieldset>
          <fieldset>
            <legend>
              Screenshots <ImImages />
            </legend>
            <div className="scroller">
              {currentProject.screenshots.map((s) => (
                <div className="image-container" key={uuidv4()}>
                  <img
                    key={uuidv4()}
                    src={`${SERVER_BASE_URL()}/${imagePath()}/${s.fileName}`}
                    alt={s.description}
                  />
                  {currentProject.mainImage._id === s._id && (
                    <FaRegCheckCircle className="mainImage-icon" />
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </StyledProjectView>
  );
};

const StyledProjectView = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 90vw;
    height: 90vh;
    background-color: #ebebeb;
    font-size: 12pt;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    padding: 2rem;

    .form-information {
      width: 100%;
      height: 90%;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      overflow-y: scroll;
      overflow-x: hidden;

      .details {
        display: flex;
        width: auto;
        height: auto;
        padding: 1rem;
        gap: 1rem;
        .subsection {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          input[type="checkbox"] {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 4px;
            cursor: default;
          }
        }
      }
      .addresses {
        display: flex;
        flex-direction: column;
        min-width: 40%;
        //height: auto;
        padding: 1rem;
        row-gap: 0.5rem;
      }

      .descriptions {
        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        padding: 1rem;
      }
      .dates {
        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        padding: 1rem;
        gap: 1rem;
      }

      .scroller {
        padding: 1rem;
        width: 84vw;
        overflow-x: scroll;
        display: flex;
        column-gap: 0.5rem;
        .image-container {
          position: relative;
          img {
            cursor: default;
            height: auto;
            width: 425px;
            object-fit: contain;
            object-position: center center;
            border-radius: 4px;
            border: 1px solid #689ed0;
          }
          .mainImage-icon {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            width: 3rem;
            height: 3rem;
            cursor: pointer;
            color: green;
          }
        }
      }

      .features,
      .highlights,
      .libraries,
      .technologies,
      .packages {
        padding: 1rem;
        ul {
          list-style-type: none;
          li {
            text-decoration: none;
            width: 100%;
            border-radius: 4px;
            margin-bottom: 0.5rem;
            padding: 0.25rem;
            background-color: rgba(131, 169, 204, 0.5);
            font-family: "Poppins", sans-serif;
            font-weight: 300;
            font-size: 10pt;
          }
        }
      }

      p {
        width: 100%;
        background-color: rgba(131, 169, 204, 0.5);
        border-radius: 4px;
        padding: 0.25rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 10pt;
      }
      .address-item {
        display: flex;
        flex-direction: column;
        .address {
          display: flex;
          align-items: center;
          column-gap: 0.5rem;
          .address-icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
      fieldset {
        border-radius: 4px;
      }
      legend {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 0.5rem;
        padding: 0 0.5rem;
        font-weight: bold;
        font-size: 14pt;
        font-variant-caps: all-small-caps;
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
    }
  }
`;

export default ProjectView;
