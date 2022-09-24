import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
//icons
import { CgWebsite } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { HiCode } from "react-icons/hi";
//components
import SubmitButton from "../submitButton";
import CloseButton from "../closeButton";
import Spinner from "../spinner";
import Icon from "../Icon";

const TechAddViewEdit = function ({
  openingHookSetter,
  handleSaveTech,
  handleEditTech,
  title,
  currentTech,
  setCurrentTech,
  formType,
  fetchingData,
  allIcons,
}) {
  
  //const [dbText, setDbText] = useState("")
  const [filteredList, setFilteredList] = useState([])
  //const [clickedIcon, setClickedIcon] = useState("");
  let arrIcons = [];

  for (const icon in allIcons) {
    arrIcons.push(icon);
  }
  
  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  };
  
  console.log(currentTech.icon);
  
  function updateList (searchText, currentTech) {
    let list = []
    if (searchText.length > 2) {
      list = arrIcons.filter(icon => icon.toLowerCase().includes(searchText))
      setCurrentTech((currentTech) => ({...currentTech, icon: list[0]}));
      setFilteredList(arrIcons.filter(icon => icon.toLowerCase().includes(searchText)));
    }
  }
  
  // const updateDBText = useCallback(debounce(text => { setDbText(text) }, 1000), [])
  const updateFilteredIconList = useCallback(debounce((text, currentTech) => { updateList(text, currentTech) }, 1000), [])
  // const cb = updateList;
  // const delay = 1000;
  // const updateFilteredIconList = useCallback(
  //   (cb, delay) => {
  //   let timeout;
  //   return (...args) => {
  //     clearTimeout(timeout)
  //     timeout = setTimeout(() => {
  //       cb(...args)
  //     }, delay)
  //   }
  // }
  //   , [])
  
  return (
    <StyledTechAddViewEdit>
      <div className="container">
        <CloseButton
          closeFunction={openingHookSetter}
          resetFunction={setCurrentTech}
          resetObject={{
            name: "",
            category: "",
            description: "",
            address: "",
            iconSearch: "",
            icon: "",
            color: "#313131",
            documentation: "",
          }}
        />

        <div className="titleHeader">
          <HiCode className="titleIcon" />
          <h1>{title} </h1>
          {formType !== "ADD" && <h5>{currentTech?._id}</h5>}
        </div>

        <div className="form-information">
          <div className="input-item">
            <label htmlFor="name">Technology name:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="name"
              autoComplete="off"
              value={currentTech?.name}
              onChange={(e) =>
                setCurrentTech({
                  ...currentTech,
                  [e.target.name]: e.target.value,
                })
              }
              />
          </div>
          
          <div className="input-item">
            <label htmlFor="type">Category:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="category"
              autoComplete="off"
              value={currentTech?.category}
              onChange={(e) =>
                setCurrentTech({
                  ...currentTech,
                  [e.target.name]: e.target.value,
                })
              }
              />
          </div>
         
          <div className="input-item">
            <label htmlFor="type">Description:</label>
            <input
              disabled={formType === "VIEW" ? true : false}
              type="text"
              name="description"
              autoComplete="off"
              value={currentTech?.description}
              onChange={(e) =>
                setCurrentTech({
                  ...currentTech,
                  [e.target.name]: e.target.value,
                })
              }
              />
          </div>

          <div className="input-item">
            <label htmlFor="address">Address:</label>
            <div className="address-item">
              <CgWebsite className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="address"
                autoComplete="off"
                value={currentTech?.address}
                onChange={(e) =>
                  setCurrentTech({
                    ...currentTech,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="input-item">
            <label htmlFor="documentation">Documentation:</label>
            <div className="address-item">
              <FaBook className="address-icon" />
              <input
                disabled={formType === "VIEW" ? true : false}
                type="text"
                name="documentation"
                autoComplete="off"
                value={currentTech?.documentation}
                onChange={(e) =>
                  setCurrentTech({
                    ...currentTech,
                    [e.target.name]: e.target.value,
                  })
                }
                />
            </div>
          </div>
          
          {/* icon section start  */}
          <div className="icon-section">
            <div className="fields">
              {formType !== "VIEW" && 
              <>
              <div className="input-item">
                <label htmlFor="documentation">Search icons (enter at least 3 letters):</label>
                <input
                  disabled={formType === "VIEW" ? true : false}
                  type="text"
                  name="iconSearch"
                  autoComplete="off"
                  value={currentTech?.iconSearch}
                  onChange={(e) =>{
                    setCurrentTech({
                      ...currentTech,
                      //icon: filteredList[0],
                      [e.target.name]: e.target.value,
                    });
                    updateFilteredIconList(e.target.value);
                  }}
                  />
              </div>
              
                <div className="input-item">
                  <label htmlFor="icon">Select from ({filteredList.length}) icons:</label>
                <select
                  disabled={formType === "VIEW" ? true : false}
                  name="icon"
                  placeholder={currentTech?.icon}
                  value={currentTech?.icon}
                  onChange={(e) =>{
                    setCurrentTech({
                      ...currentTech,
                      [e.target.name]: e.target.value,
                    });
                    //setClickedIcon(() => e.target.value);
                    setCurrentTech(()=> ({...currentTech, icon: e.target.value}));
                  }
                  }
                  >
                {filteredList.map((i) => {
                  return (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  );
                })}
                </select>
              </div>
            </>
            }
              
            {formType !== "VIEW" && 
            <div className="color-item">
              <label htmlFor="color">Color:</label>
              <input
                disabled={formType === "VIEW" ? true : false}
                type="color"
                name="color"
                autoComplete="off"
                value={currentTech?.color}
                onChange={(e) =>
                  setCurrentTech({
                    ...currentTech,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            }
            </div>
            
            <div className="preview">
              <Icon
                icon={currentTech?.icon}
                color={currentTech?.color}
                size="100px"
                title={currentTech?.icon}
                className="item-icon"
                allIcons={allIcons}
              /> 
              {currentTech.icon &&
                //formType === "VIEW" &&
                <>
                  <h5>{currentTech.icon}</h5>
                  <h5>{currentTech.color}</h5>
                </>
          
              }
            </div>

          </div>
          {/* icon section end  */}

        </div>{/* form-information end  */}

          {formType !== "VIEW" &&
            (fetchingData ? (
              <Spinner size="25px" alignment="flex-end" />
            ) : (
              <SubmitButton
                type={formType}
                editFunction={handleEditTech}
                saveFunction={handleSaveTech}
              />
            ))}
        </div>
      
    </StyledTechAddViewEdit>
  );
};

const StyledTechAddViewEdit = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  z-index: 10;
  position: absolute;
  top: -9vh;
  left: -15.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(256, 256, 256, 0.5);

  .container {
    width: 60vw;
    height: auto;
    background-color: #ebebeb;
    border: 0.05rem #689ed0 solid;
    position: relative;
    box-shadow: 0 0 20px 10px #689ed0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    
    .form-information {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
      justify-content: center;
      //align-items: center;
      
      label {
        font-weight: bold;
        font-size: 12pt;
        font-variant-caps: all-small-caps;
        margin-bottom: 0.25rem;
      }

      .icon-section{
        display: flex;
        //border: 1px solid green;
        justify-content: center;
        align-self: center;
        width: 80%;
        column-gap: 1rem;
        .fields{
          .color-item {
            display: flex;
            flex-direction: column;
          }
        }
        .preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          row-gap: 0.25rem;
          
          h5{
            color: #0c395e;
          }
          .item-icon{
            border: 1px solid #313131;
            border-radius: 4px;
            aspect-ratio: 1;
            padding: 0.25rem;
          }
        }
      }
      
      .input-item {
        display: flex;
        flex-direction: column;
      }
      .address-item {
        display: flex;
        column-gap: 0.25rem;
        align-items: center;
        .address-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      
      input[type="text"], select {
        color: #0c395e;
        resize: none;
        outline: solid 3px transparent;
        border-radius: 4px;
        padding: 0.25rem;
        font-family: "Poppins", sans-serif;
        font-weight: 300;
        font-size: 10pt;
        border: 1px solid #313131;
        flex-grow: 1;
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
    top: 0vh;
    left: 0vw;

    .container {
      width: 90vw;
      height: auto;
      padding: 1rem;
    }
  }

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    top: 0vh;
    left: 0vw;

    .container {
      width: 100vw;
      height: auto;
      padding: 1rem;
    }
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
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: portrait) {}

  //1025px — 1200px: Desktops, large screens
  //@media screen and (min-width: 1024px) and (max-width: 1200px) and (orientation: landscape) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: portrait) {}

  //1201px and more —  Extra large screens, TV
  //@media screen and (min-width: 1201px) and (max-width: 1500px) and (orientation: landscape) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1501px) and (orientation: portrait) {}

  //1501px and more —  Extra large screens, TV
  //@media screen and (min-width: 1921px) and (orientation: landscape) {}
`;

export default TechAddViewEdit;
