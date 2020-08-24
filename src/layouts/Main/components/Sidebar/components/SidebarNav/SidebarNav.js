/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, ListItemText, Button, colors, Collapse, ListSubheader, Divider, ListItemIcon } from '@material-ui/core';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined'; import ChevronRightOutlined from '@material-ui/icons/ChevronRightOutlined';
import {programs } from 'hcd-config';

const activeprogid = parseFloat(localStorage.getItem('program')) || 1

const activeprog = programs.filter(er => er.id == activeprogid)

console.log('kenya', activeprog[0].pages)

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    padding: 2,
    fontWeight: 'normal',
    // backgroundColor: '#fbfbfb'
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
    fontWeight: 'normal'
  },
  fwmedium: {
    fontWeight: 'normal'
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
    backgroundColor: '#fafafa',
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
    marginLeft: '15px',
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
    {/* <RouterLink isExact={false} {...props} /> */}
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {

  const { className, location, ...rest } = props;
  
  if(location.hash == "" || location.hash == undefined){location.hash=""}
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
       
         
        {activeprog[0].pages.map( (pg)=> (
         <ListItem className={classes.item} disableGutters >
         <Button activeClassName={classes.active} className={classes.button} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
       </ListItem>
      ))
      }
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  // pages: PropTypes.array.isRequired
};

export default SidebarNav;
