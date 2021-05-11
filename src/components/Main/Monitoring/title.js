import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      justifyContent: "space-between",
    },
    subTitle: {
      marginRight: 10,
      color: theme.palette.text.secondary,
    },
  })
);

export default function Title({ controller }) {
  const classes = useStyles();
  const { commCenter } = controller;
  return (
    <Typography>
      <div className={classes.firstLayerTitle}>
        <div className={classes.title}>
          <Box className={classes.subTitle} style={{ fontSize: 16 }}>
            Коммуникационный центр -
          </Box>
          <Box fontWeight="fontWeightMedium" style={{ fontSize: 20 }}>
            {commCenter.name}
          </Box>
        </div>
        <div className={classes.title}>
          <Box className={classes.subTitle} style={{ fontSize: 14 }}>
            Статус -
          </Box>

          {commCenter.status === "offline" ? (
            <Box style={{ fontSize: 14 }}>офлайн</Box>
          ) : (
            <Box style={{ fontSize: 14 }}>онлайн</Box>
          )}
          <Box>
            <StopRoundedIcon
              style={{
                color: commCenter.status === "offline" ? "#d50000" : "#64dd17",
                margin: 0,
              }}
            />
          </Box>
        </div>
      </div>
      <div className={classes.title}>
        <Box
          className={classes.subTitle}
          style={{ fontSize: 16, marginRight: 10 }}
        >
          Описание -
        </Box>
        <Box style={{ fontSize: 14 }}>{commCenter.description}</Box>
      </div>
    </Typography>
  );
}
