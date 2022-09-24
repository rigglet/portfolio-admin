import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Icon from "../components/Icon";
import { debounce, getIconList } from "../utility/utility";

const IconPicker = function ({
    formType,
    currentObject,
    setCurrentObject,
    allIcons,
}) {

  let arrIcons = getIconList(allIcons);
  const [filteredList, setFilteredList] = useState([]);

  function updateList (searchText) {
    let list = []
    if (searchText.length > 2) {
      list = arrIcons.filter(icon => icon.toLowerCase().includes(searchText))
      setCurrentObject((currentObject) => ({...currentObject, icon: list[0]}));
      setFilteredList(arrIcons.filter(icon => icon.toLowerCase().includes(searchText)));
    }
  }
  const updateFilteredIconList = debounce((text) => { updateList(text) }, 1000);

  return (
    <StyledIconPicker>
        <div className={formType !== "VIEW" ? "fields" : "notfields"}>
            {formType !== "VIEW" && 
            <>
            <div className="input-item">
                <label htmlFor="iconSearch">Search icons (enter at least 3 letters):</label>
                <input
                    disabled={formType === "VIEW" ? true : false}
                    type="text"
                    name="iconSearch"
                    autoComplete="off"
                    value={currentObject?.iconSearch}
                    onChange={(e) =>{
                    setCurrentObject({
                        ...currentObject,
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
                  placeholder={currentObject?.icon}
                  value={currentObject?.icon}
                  onChange={(e) =>{
                    setCurrentObject({
                      ...currentObject,
                      [e.target.name]: e.target.value,
                    });
                    setCurrentObject(()=> ({...currentObject, icon: e.target.value}));
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
                value={currentObject?.color}
                onChange={(e) =>
                  setCurrentObject({
                    ...currentObject,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            }
        </div>
            
            <div className="preview">
              <Icon
                icon={currentObject?.icon}
                color={currentObject?.color}
                size="100px"
                title={currentObject?.icon}
                className="item-icon"
                allIcons={allIcons}
              /> 
              {currentObject.icon &&
                <>
                  <h5>{currentObject.icon}</h5>
                  <h5>{currentObject.color}</h5>
                </>
          
              }
            </div>
    </StyledIconPicker>
  );
};

const StyledIconPicker = styled(motion.div)`
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 1rem;
    row-gap: 0.5rem;
    flex-grow: 1;
    flex-wrap: wrap;
    
    .fields{
        flex-grow: 1;
        .color-item {
            display: flex;
            flex-direction: column;
        }
    }
    .notfields{
        display: none;
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
`;

export default IconPicker;
