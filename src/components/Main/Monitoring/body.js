import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GroupTable from "./grTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
      margin: 10,
      backgroundColor: "#fcfdf4",
      overflowY: "scroll",
      maxHeight: "74vh",
    },
    acordion: {
      width: "100%",
      marginBottom: 20,
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightMedium,
    },
  })
);

export default function Body({ controller }) {
  const classes = useStyles();
  console.log(controller);
  console.log(controller.registersGroups);
  let groups = [];
  if (controller.registersGroups) {
    controller.registersGroups.forEach((gr, i) => {
      groups.push(
        <div className={classes.acordion} key={gr.id}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{gr.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GroupTable group={gr} />
            </AccordionDetails>
          </Accordion>
        </div>
      );
    });
  }

  return <div className={classes.root}>{groups}</div>;
}
