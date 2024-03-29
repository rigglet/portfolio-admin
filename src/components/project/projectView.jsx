import styled from "styled-components";
//UUID inique ID generator
import { v4 as uuidv4 } from "uuid";
//dates
import { DateTime } from "luxon";
//icons
import { FaGithub, FaRegCheckCircle, FaYoutube } from "react-icons/fa";
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
    <StyledProjectView className="add-view-edit-modal">
      <div className="add-view-edit-modal-container">
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
            walkthroughVideo: "",
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

        <div className="title-header">
          <MdWeb className="title-icon" />
          <h1>{title} </h1>
          <h5>{currentProject?._id}</h5>
        </div>

        <div className="form-information">
          <fieldset className="details">
            <legend>
              Details <BsCardText />
            </legend>
            <div className="subsection">
              <div className="input-container">
                <label htmlFor="projectName">Project name:</label>
                <p>{currentProject?.projectName}</p>
              </div>
              <div className="input-container">
                <label htmlFor="version">Version:</label>
                <p>{currentProject?.version}</p>
              </div>
              <div className="input-container">
                <label htmlFor="author">Author:</label>
                <p>{currentProject?.author}</p>
              </div>
            </div>
            <div className="subsection">
              <div className="input-container">
                <label htmlFor="featured">Featured:</label>
                <input
                  disabled={true}
                  checked={currentProject?.featured}
                  type="checkbox"
                  name="featured"
                  id="featured"
                />
              </div>
              <div className="input-container">
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
            <div className="address-input-container">
              <label htmlFor="github">Github:</label>
              <div className="address">
                <FaGithub className="address-icon" />
                <p>{currentProject?.githubLink}</p>
              </div>
            </div>
            <div className="address-input-container">
              <label htmlFor="website">Website:</label>
              <div className="address">
                <CgWebsite className="address-icon" />
                <p>{currentProject?.website}</p>
              </div>
            </div>
            <div className="address-input-container">
              <label htmlFor="walkthrough">Walkthrough:</label>
              <div className="address">
                <FaYoutube className="address-icon" />
                <p>{currentProject?.walkthroughVideo}</p>
              </div>
            </div>
          </fieldset>

          <fieldset className="dates">
            <legend>
              Dates <AiOutlineCalendar />
            </legend>
            <div className="input-container">
              <label htmlFor="started">Started:</label>
              <p>
                {DateTime.fromISO(currentProject?.startedDate)
                  .setLocale("uk")
                  .toLocaleString({
                    timeZoneName: "short",
                  })}
              </p>
            </div>
            <div className="input-container">
              <label htmlFor="started">Completed:</label>
              <p>
                {DateTime.fromISO(currentProject?.completedDate)
                  .setLocale("uk")
                  .toLocaleString({
                    timeZoneName: "short",
                  })}
              </p>
            </div>
            <div className="input-container">
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
            <div className="input-container">
              <label htmlFor="short">Short description:</label>
              <p>{currentProject?.shortDescription}</p>
            </div>
            <div className="input-container">
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
  .add-view-edit-modal-container {
    width: 90vw;
    height: 90vh;
  }
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
      .address-input-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
      /* .input-item {
        display: flex;
        flex-direction: column;
      } */
    }
  

  //#### RESPONSIVE SECTION ####
  //320px — 480px: Mobile devices
  @media screen and (max-width: 480px) and (orientation: portrait) {
    top: 0vh;
    left: 0vw;
    align-items: flex-start;
    overflow-y: scroll;

    .container {
      width: 100vw;
      height: auto;
      padding: 1rem;

      .form-information {
        height: auto;
        flex-direction: column;
        gap: 1rem;
        overflow-y: scroll;

        .scroller {
          display: flex;
          flex-direction: column;
          //overflow-y: scroll;

          padding: 1rem;
          width: 84vw;
          column-gap: 0.5rem;
          .image-container {
            position: relative;
            img {
              width: 100%;
              object-fit: scale-down;
            }
          }
        }
      }
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

export default ProjectView;
