import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ruRU } from "@material-ui/core/locale";
import PipelineTable from "./PipelineTable/pipeline.table.index";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperJournal: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
  })
);

export default function Users() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: 20 }}>
        <h2 style={{ margin: 20 }}>Трубопровод</h2>
        <Paper className={classes.paperJournal}>
          <PipelineTable />
        </Paper>
      </div>
    </ThemeProvider>
  );
}
