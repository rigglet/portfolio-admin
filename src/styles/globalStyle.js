//font-family: 'Inter', sans-serif;
//font-family: 'Lobster', cursive;
//font-family: 'Montserrat', sans-serif;
//gradient colors - #34CE93
//#59ADEB

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    //cursor: default;
}

body {
    color: #313131;
    background-color: #ebebeb;
    //font-family: 'Roboto', sans-serif;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    overflow-y: hidden;
}

.add-view-edit-modal {
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
}

.add-view-edit-modal-container {
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
}

//labels
label {
  font-weight: bold;
  font-size: 12pt;
  font-variant-caps: all-small-caps;
  margin-bottom: 0.5rem;
}

//add-view-edit-modal
.ave-modal-form-information {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  justify-content: center;
}

.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.address-input-container {
  display: flex;
  column-gap: 0.25rem;
  align-items: center;
  .address-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

select,
textarea,
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
textarea:focus,
input[type="text"]:focus {
  outline: solid 3px #688297;
  border-color: transparent;
}


//header section for add/view/edit modal
.title-header {
  display: flex;
  column-gap: 1rem;
  margin-bottom: 1rem;
  h1 {
    font-size: 16pt;
    font-weight: 600;
    //margin-bottom: 0.5rem;
  }
  .title-icon {
    width: 30px;
    height: 30px;
  }
  h5 {
    border-radius: 4px;
    padding: 0.25rem;
    background-color: rgba(131, 169, 204, 0.5);
    font-family: "Poppins", sans-serif;
    font-weight: 300;
    font-size: 10pt;
    //margin-bottom: 1.5rem;
  }
}

.upper {
  text-transform: capitalize;
}

//FORM SUBMIT
input[type="submit"], .wizard-submit {
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
    width: 100px;
    height: 40px;
    cursor: pointer;
    align-self: flex-end;
  }

  input[type="submit"]:hover,
  .wizard-submit:hover {
    color: white;
    background-color: #0c395e;
    transition: 0.3s;
  }

//WIZARD NAV
.stepNav {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
  .nav-buttons {
    width: 2rem;
    height: 2rem;
    color: #688297;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover, &:focus {
      color: #313131;
      transform: scale(1.05);
    } 
    &:active {
      //outline: 2px solid #689ed0;
      //color: #1a7113;
      transform: scale(0.95);
    }
  }
}

//Header section
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80vw;
  margin-bottom: 0.5rem;
  .toolbar {
    display: flex;
    gap: 0.5rem;
    .header-icon {
      cursor: pointer;
      width: 1.4rem;
      height: 1.4rem;
      &:hover {
        transition: 0.3s ease;
        transform: scale(1.1);
      }
    }
  }
  h1 {
    font-size: 16pt;
    font-weight: 600;
    cursor: default;
  }
}

//Action column icons
.action-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .action-icon {
    cursor: pointer;
    width: 1.2rem;
    height: 1.2rem;
    color: #888888;
    &:hover {
      color: #313131;
    }
  }

//WIZARD PROGRESS
.progress {
    width: 80%;
  }
  progress[value] {
    /* Reset the default appearance */
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 0.5rem;
  }

  progress[value]::-webkit-progress-bar {
    background-color: #eee;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }
  progress[value]::-webkit-progress-value {
    background-color: #688297;
    border-radius: 2px;
  }



//#### RESPONSIVE SECTION ####
//320px — 480px: Mobile devices
@media screen and (max-width: 480px) and (orientation: portrait) {
  //header section for add/view/edit modal
  .titleHeader {
    flex-direction: column;
  }

  //header section for each table
  .header {
    justify-content: space-around;
    width: 100vw;
    margin-bottom: 0.25rem;
    .toolbar {
      gap: 0.25rem;
      .header-icon {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    h1 {
      font-size: 11pt;
    }
  }
}

  //320px — 480px: Mobile devices
  @media screen and (max-width: 850px) and (orientation: landscape) {
    body{

    overflow-y: scroll;
    }
    //header section for add/view/edit modal
    .titleHeader {
      flex-direction: column;
    }

    //header section for each table
    .header {
      justify-content: space-around;
      width: 100vw;
      margin-bottom: 0.25rem;
      .toolbar {
        gap: 0.25rem;
        .header-icon {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
      h1 {
        font-size: 11pt;
      }
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

export default GlobalStyle;
