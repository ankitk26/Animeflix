import { createMuiTheme } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1f",
    },
    primary: {
      main: red[800],
    },
    secondary: {
      main: red[400],
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

export default theme;
