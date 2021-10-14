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
import { updateCommCenterMonitoringBySocket } from "../../../actions/commCenterMonitoring";
import { updateSocketProgrammStatus } from "../../../actions/commCenterMonitoring";
import { updateSocketControllerStatus } from "../../../actions/commCenterMonitoring";
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

export default function Controllers({ controllers }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const commCenterMonitoring = useSelector(
    (state) => state.commCenterMonitoringReducer.item
  );

  useEffect(() => {
    //registerControllerValue
    const updateControllerListener = (data) => {
      console.log("socket on registerControllerValue");

      dispatch(updateCommCenterMonitoringBySocket(commCenterMonitoring, data));
    };
    socket.on("registerControllerValue", updateControllerListener);
    return () => {
      socket.off("registerControllerValue", updateControllerListener);
    };
  }, [commCenterMonitoring, dispatch]);

  useEffect(() => {
    const updateControllerProgrammStatus = (data) => {
      console.log("socket on programmStatusChanged");

      dispatch(updateSocketProgrammStatus(commCenterMonitoring, data));
    };
    socket.on("programmStatusChanged", updateControllerProgrammStatus);
    return () => {
      socket.off("programmStatusChanged", updateControllerProgrammStatus);
    };
  }, [commCenterMonitoring, dispatch]);

  useEffect(() => {
    const updateControllerStatus = (data) => {
      console.log("socket on updateSocketControllerStatus");

      dispatch(updateSocketControllerStatus(commCenterMonitoring, data));
    };
    socket.on("controllerStatusChanged", updateControllerStatus);
    return () => {
      socket.off("controllerStatusChanged", updateControllerStatus);
    };
  }, [commCenterMonitoring, dispatch]);

  const [expanded, setExpanded] = React.useState(true);

  let groups = [];
  controllers.forEach((controller, i) => {
    groups.push(
      <div className={classes.acordion} key={controller.modbusId}>
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
          </div>

          <div className={classes.title}>
            <Box className={classes.subTitle} style={{ fontSize: 12 }}>
              Программа котнтроллера-
            </Box>

            {controller.programmStatus === "offline" ? (
              <Box style={{ fontSize: 12 }}>незапущена</Box>
            ) : (
              <Box style={{ fontSize: 12 }}>запущена</Box>
            )}
            <Box>
              <StopRoundedIcon
                style={{
                  color:
                    controller.programmStatus === "offline"
                      ? "#d50000"
                      : "#64dd17",
                  margin: 0,
                }}
              />
            </Box>
          </div>

          <div className={classes.title}>
            <Box className={classes.subTitle} style={{ fontSize: 12 }}>
              Статус котнтроллера-
            </Box>

            {controller.status === "offline" ? (
              <Box style={{ fontSize: 12 }}>недоступен</Box>
            ) : (
              <Box style={{ fontSize: 12 }}>доступен</Box>
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
        <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {controller.description}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GroupTable controller={controller} />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });

  return <div className={classes.root}>{groups}</div>;
}
