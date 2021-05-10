import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeviceHubIcon from "@material-ui/icons/DeviceHub"; //controllers
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"; //map
// import DvrOutlinedIcon from "@material-ui/icons/DvrOutlined"; //monitoring
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined"; //comm centers
import ListAltOutlinedIcon from "@material-ui/icons/ListAltOutlined"; //registers
import ListItemMonitor from "./listItemMonitor";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    menuButton: {},
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      top: 56,
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
      top: 56,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },

    link: {
      textDecoration: "none",
      color: "black",
    },
  })
);

export default function LeftBar({ commCenters }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
        </Toolbar>
        <Divider />
        <List>
          <Link to={"/main/map-commCenters"} className={classes.link}>
            <ListItem button key="Карта">
              <ListItemIcon>
                <LocationOnOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Карта" />
            </ListItem>
          </Link>
          <ListItemMonitor commCenters={commCenters} />
        </List>

        <Divider />
        <List>
          <Link to={"/main/controllers"} className={classes.link}>
            <ListItem button key="Контролеры">
              <ListItemIcon>
                <DeviceHubIcon />
              </ListItemIcon>
              <ListItemText primary="Контролеры" />
            </ListItem>
          </Link>

          <Link to={"/main/comm-centers"} className={classes.link}>
            <ListItem button key="Коммуникационные центры">
              <ListItemIcon>
                <DnsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Коммуникационные центры" />
            </ListItem>
          </Link>

          <Link to={"/main/registers"} className={classes.link}>
            <ListItem button key="Регистры">
              <ListItemIcon>
                <ListAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Регистры" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
}
