import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link, useRouteMatch } from "react-router-dom";
import { matchPath } from "react-router";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DvrOutlinedIcon from "@material-ui/icons/DvrOutlined";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
    },
    nested: {
      paddingLeft: theme.spacing(4),
      paddingTop: 0,
      paddingBott: 0,
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
  })
);

export default function NestedList({ commCenters }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const journalName = useSelector((state) => state.currentJournalReducer.item);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <DvrOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Журналы" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {commCenters
            ? commCenters.map((comm) => (
                <Link
                  key={comm.path}
                  to={`/main/journals/${comm.path}/${journalName}`}
                  className={classes.link}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <FiberManualRecordIcon style={{ width: "8px" }} />
                    </ListItemIcon>
                    <ListItemText primary={comm.name}> </ListItemText>
                  </ListItem>
                </Link>
              ))
            : ""}
        </List>
      </Collapse>
    </List>
  );
}
