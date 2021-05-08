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
.close {
      z-index: 11;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 2.2rem;
      //padding-bottom: 0.5rem;
      position: absolute;
      top: 1rem;
      right: 1rem;
      border: 0;
      outline: 0;
      cursor: pointer;
      font-size: 1.8rem;
      font-weight: bold;
      color: #920000;
      background-color: #ebebeb;
    }
`;

export default GlobalStyle;
