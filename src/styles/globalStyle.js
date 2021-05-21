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
}

body {
    color: #313131;
    background-color: #ebebeb;
    //font-family: 'Roboto', sans-serif;
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
    overflow-y: hidden;
}

.upper {
    text-transform: capitalize;
  }

.titleHeader {
      display: flex;
      column-gap: 1rem;
      margin-bottom: 1rem;
      h1 {
        font-size: 16pt;
        font-weight: 600;
        //margin-bottom: 0.5rem;
      }
      .titleIcon {
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
`;

export default GlobalStyle;
