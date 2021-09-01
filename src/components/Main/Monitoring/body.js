import React, { useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { useDispatch, useSelector } from "react-redux";
import { updateControllerBySocket } from "../../../actions/controllersForCommCenters";
import { socket } from "../../../socket_api";
import GroupTable from "./grTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 10,
      margin: 10,
      backgroundColor: "#fcfdf4",
      overflowY: "scroll",
      // maxHeight: "74vh",
    },
    acordion: {
      width: "100%",
      marginBottom: 20,
    },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightMedium,
    },
    title: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    titleRoot: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    subTitle: {
      marginRight: 10,
      color: theme.palette.text.secondary,
    },
  })
);

function ControllerValue({ controller }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const controllers = useSelector(
    (state) => state.controllersForCommCentersReducer.controllers
  );

  useEffect(() => {
    // let isMounted = true;
    const updateControllerListener = (data) => {
      console.log("socket on registerControllerValue");

      dispatch(updateControllerBySocket(controllers, data));
    };
    socket.on("registerControllerValue", updateControllerListener);
    return () => {
      // isMounted = false;
      socket.off("registerControllerValue", updateControllerListener);
    };
  }, [controllers, dispatch]);

  const [expanded, setExpanded] = React.useState(true);
  let groups = [];
  if (controller.registersGroups) {
    controller.registersGroups.forEach((gr, i) => {
      groups.push(
        <div className={classes.acordion} key={gr.id}>
          <div className={classes.titleRoot}>
            <div className={classes.firstLayerTitle}>
              <div className={classes.title}>
                <Box className={classes.subTitle} style={{ fontSize: 14 }}>
                  Контролер -
                </Box>
                <Box fontWeight="fontWeightMedium" style={{ fontSize: 16 }}>
                  {controller.name} (ID-{controller.modbusId})
                </Box>
              </div>
              <div className={classes.title}>
                <Box className={classes.subTitle} style={{ fontSize: 12 }}>
                  Статус -
                </Box>

                {controller.status === "offline" ? (
                  <Box style={{ fontSize: 12 }}>офлайн</Box>
                ) : (
                  <Box style={{ fontSize: 12 }}>онлайн</Box>
                )}
                <Box>
                  <StopRoundedIcon
                    style={{
                      color:
                        controller.status === "offline" ? "#d50000" : "#64dd17",
                      margin: 0,
                    }}
                  />
                </Box>
              </div>
            </div>
            <div className={classes.title}>
              <Box
                className={classes.subTitle}
                style={{ fontSize: 12, marginRight: 10 }}
              >
                Описание -
              </Box>
              <Box style={{ fontSize: 14 }}>{controller.description}</Box>
            </div>
          </div>
          <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
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

export default function Body({ controllersForCommCenter }) {
  return controllersForCommCenter.map((controller, index) => {
    return <ControllerValue key={index} controller={controller} />;
  });
}
