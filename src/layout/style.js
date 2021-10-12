import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  // backdrop: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   color: "#fff",
  // },
}));
export default useStyles;
