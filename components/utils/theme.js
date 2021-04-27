import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
        light: "#64d8cb",
        main: "#26a69a",
        dark: "#00766c",
        contrastText: "#fff"
    },
    secondary: {
        light: "#a7c0cd",
        main: "#78909c",
        dark: "#4b636e",
        contrastText: "#fff"
    },
    error: {
        light: "#ff867c",
        main: "#ef5350",
        dark: "#b61827",
        contrastText: "#fff"
    },
    background: {
        default: "#FFF"
    }
  }
});

export default theme;