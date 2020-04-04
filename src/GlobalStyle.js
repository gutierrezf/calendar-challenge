import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html, body, #app {
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100%;
    }
    body {
        font-family: sans-serif;
    }

    * {
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
