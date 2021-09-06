import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Link, useRouteMatch } from "react-router-dom";
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
// <ListItem button className={classes.nested}>
//   <ListItemIcon>
//     <InboxIcon />
//   </ListItemIcon>
//
//   <ListItemText primary="Starred" />
// </ListItem>

export default function NestedList({ commCenters }) {
  let { path } = useRouteMatch();

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
                  to={`${path}/journals/${comm.path}`}
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
