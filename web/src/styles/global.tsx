import { createGlobalStyle, css } from "styled-components";
import theme from "./theme";

const variables = css`
  :root {
    --jd-color-border: ${theme.colors.background};
    --jd-color-panel: ${theme.colors.background};
  }
`;

const GlobalStyles = createGlobalStyle`
    ${variables}
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        background: ${theme.colors.background};
        font-family:  sans-serif;
        overflow-x: hidden;
        color: ${theme.colors.text_primary};
    }
    html {
        scroll-behavior: smooth;
        scrollbar-width: thin;
    }
    button {
        cursor: pointer;
        border: none;
        &:disabled {
        cursor: default;
        }
    }
    input {
        outline: none;
    }
    a {
        text-decoration: none;
    }
`;

export default GlobalStyles;
