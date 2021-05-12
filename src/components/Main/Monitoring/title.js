import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    firstLayerTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "flex-start",
    },
    subTitle: {
      marginRight: 10,
      color: theme.palette.text.secondary,
    },
  })
);

export default function Title({ controller }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <div className={classes.firstLayerTitle}>
          <div className={classes.title}>
            <Box className={classes.subTitle} style={{ fontSize: 18 }}>
              Коммуникационный центр -
            </Box>
            <Box fontWeight="fontWeightMedium" style={{ fontSize: 22 }}>
              {controller.commCenter.name}
            </Box>
          </div>
          <div className={classes.title}>
            <Box className={classes.subTitle} style={{ fontSize: 14 }}>
              Статус -
            </Box>

            {controller.commCenter.status === "offline" ? (
              <Box style={{ fontSize: 14 }}>офлайн</Box>
            ) : (
              <Box style={{ fontSize: 14 }}>онлайн</Box>
            )}
            <Box>
              <StopRoundedIcon
                style={{
                  color:
                    controller.commCenter.status === "offline"
                      ? "#d50000"
                      : "#64dd17",
                  margin: 0,
                }}
              />
            </Box>
          </div>
        </div>
        <div className={classes.title}>
          <Box
            className={classes.subTitle}
            style={{ fontSize: 14, marginRight: 10 }}
          >
            Описание -
          </Box>
          <Box style={{ fontSize: 14 }}>
            {controller.commCenter.description}
          </Box>
        </div>
      </div>
      <Divider />
      <div>
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
    </div>
  );
}
