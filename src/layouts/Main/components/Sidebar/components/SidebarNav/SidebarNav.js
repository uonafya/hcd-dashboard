/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, Button, colors, Collapse, ListSubheader, Divider, ListItemIcon } from '@material-ui/core';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'; import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textAlign: 'left',
    display: 'block',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  nav: {
    textTransform: 'capitalize',
    fontWeight: 'normal',
    width: '100%',
    textAlign: 'left',
    display: 'inherit',
    marginLeft: '7px',
  },
  chevrons: {
    color: '#cccccc'
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  //multi menu
  const [open1, setOpen1] = React.useState(false); const handleClick1 = () => setOpen1(!open1);
  const [open2, setOpen2] = React.useState(false); const handleClick2 = () => setOpen2(!open2);
  const [open3, setOpen3] = React.useState(false); const handleClick3 = () => setOpen3(!open3);
  const [open4, setOpen4] = React.useState(false); const handleClick4 = () => setOpen4(!open4);
  const [open5, setOpen5] = React.useState(false); const handleClick5 = () => setOpen5(!open5);
  //multi menu

  return (
    <List {...rest} className={clsx(classes.root, className)} >
        <ListItem className={classes.item} disableGutters >
          <Button activeClassName={classes.active} className={classes.button} component={CustomRouterLink} to="/dashboard" > Dashbord </Button>
        </ListItem>
      {/* <br/> */}
      <ListSubheader style={{color: '#aaaaaa', fontSize: 'small'}}>COUNTY</ListSubheader>
      <Divider/>
      {/* ==============multi menu=============== */}
        <ListItem button onClick={handleClick1}>
          <ListItemText primary="Stock Status" />
          {open1 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Artesunate Inj.</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Artemether L.</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Sulphadoxine P.</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> R.D. Tests</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> All Commodities</Button></ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleClick2}>
          <ListItemText primary="Reporting Rate" />
          {open2 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Summary</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Facility RR</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Subcounty RR</Button></ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleClick3}>
          <ListItemText primary="Data Quality" />
          {open3 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Consistency</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Concordance</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Completeness</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Comparison</Button></ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleClick4}>
          <ListItemText primary="Supply Chain" />
          {open4 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open4} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Indicator Summary</Button></ListItem>
            <ListItem className={classes.item} disableGutters> <Button className={classes.nav} component={CustomRouterLink} to="/users"> Indicator Trends</Button></ListItem>
          </List>
        </Collapse>
        
        {/* ==============multi menu=============== */}
        <ListSubheader style={{color: '#aaaaaa', fontSize: 'small'}}>NATIONAL</ListSubheader>
        <Divider/>
        {/* ==============multi menu=============== */}
        <ListItem className={classes.item} disableGutters >
          <Button activeClassName={classes.active} className={classes.button} component={CustomRouterLink} to="/users" > National summary </Button>
        </ListItem>
        <ListItem className={classes.item} disableGutters >
          <Button activeClassName={classes.active} className={classes.button} component={CustomRouterLink} to="/users" > All Malaria Commodities </Button>
        </ListItem>
        <ListItem className={classes.item} disableGutters >
          <Button activeClassName={classes.active} className={classes.button} component={CustomRouterLink} to="/users" > Pending Shipments </Button>
        </ListItem>
        <ListItem className={classes.item} disableGutters >
          <Button activeClassName={classes.active} className={classes.button} component={CustomRouterLink} to="/users" > Issues vs. Receipts </Button>
        </ListItem>
        {/* ==============multi menu=============== */}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
