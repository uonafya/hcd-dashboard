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
       
		{activeprog[0].pages.filter(p_g=>p_g.level=="Dashboard").map( (pg)=> pg.active ? (
         <ListItem className={classes.item} disableGutters key={pg.route}>
			<Button className={classes.button} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
		</ListItem>
		) : "")}
      {/* <br/> */}
      <ListSubheader disableSticky style={{color: '#aaaaaa', fontSize: 'small'}}>COUNTY</ListSubheader>
      <Divider/>
      {/* ==============multi menu=============== */}
        <ListItem button onClick={handleClick1}>
          <ListItemText className={classes.fwmedium} primary="Stock Status" />
          {open1 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
			{activeprog[0].pages.filter(p_g=>p_g.page=="Stock status").map( (pg)=> pg.active ? (
				<ListItem className={classes.item} disableGutters key={pg.route}>
					<Button className={classes.nav} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
				</ListItem>
			) : "")}
          </List>
        </Collapse>

        <ListItem button onClick={handleClick2}>
          <ListItemText className={classes.fwmedium} primary="Reporting Rate" />
          {open2 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
			{activeprog[0].pages.filter(p_g=>p_g.page=="Reporting Rate").map( (pg)=> pg.active ? (
				<ListItem className={classes.item} disableGutters key={pg.route}>
					<Button className={classes.nav} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
				</ListItem>
			) : "")}
          </List>
        </Collapse>

        <ListItem button onClick={handleClick3}>
          <ListItemText className={classes.fwmedium} primary="Data Quality" />
          {open3 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
			{activeprog[0].pages.filter(p_g=>p_g.page.includes("Data Quality")).map( (pg)=> pg.active ? (
				<ListItem className={classes.item} disableGutters key={pg.route}>
					<Button className={classes.nav} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
				</ListItem>
			) : "" )}
          </List>
        </Collapse>

        <ListItem button onClick={handleClick4}>
          <ListItemText className={classes.fwmedium} primary="Supply Chain" />
          {open4 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open4} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
			{activeprog[0].pages.filter(p_g=>p_g.page.includes("Supply Chain")).map( (pg)=> pg.active ? (
				<ListItem className={classes.item} disableGutters key={pg.route}>
					<Button className={classes.nav} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
				</ListItem>
				) : "")}
          </List>
        </Collapse>

		{activeprog[0].pages.filter(p_g=>p_g.page=="Accountability").map( (pg)=> pg.active ? (
         <ListItem className={classes.item} disableGutters key={pg.route}>
			<Button className={classes.button} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
		</ListItem>
		) : "")}

		{activeprog[0].pages.filter(p_g=>p_g.page=="Issues vs Receipts").map( (pg)=> pg.active ? (
         <ListItem className={classes.item} disableGutters key={pg.route}>
			<Button className={classes.button} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
		</ListItem>
		): "")}


        <ListItem button onClick={handleClick5}>
          <ListItemText className={classes.fwmedium} primary="Facility Follow-up" />
          {open4 ? <ChevronLeftOutlinedIcon className={classes.chevrons} /> : <ChevronRightOutlined className={classes.chevrons} />}
        </ListItem>
        <Collapse in={open5} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
			{activeprog[0].pages.filter(p_g=>p_g.page=="Health Facility Followup").map( (pg)=> pg.active ? (
				<ListItem className={classes.item} disableGutters key={pg.route}>
					<Button className={classes.nav} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
				</ListItem>
			) : "")}
          </List>
        </Collapse>

        {/* ==============national=============== */}
        <ListSubheader disableSticky style={{color: '#aaaaaa', fontSize: 'small'}}>NATIONAL</ListSubheader>
        <Divider/>
         
        {activeprog[0].pages.filter(p_g=>p_g.level=="National").map( (pg)=> pg.active ? (
         <ListItem className={classes.item} disableGutters key={pg.route}>
			<Button className={classes.button} component={CustomRouterLink} to={{hash: location.hash, pathname: pg.route }}> {pg.name} </Button>
		</ListItem>
		): "")}

        {/* ==============docs=============== */}
        <ListSubheader disableSticky style={{color: '#aaaaaa', fontSize: 'small'}}>DOCUMENTATION</ListSubheader>
        <Divider/>
         
         <ListItem className={classes.item} disableGutters key={'user'}>
			<Button className={classes.button} href="https://elearning.health.go.ke" target="_blank"> User guide </Button>
		</ListItem>
         <ListItem className={classes.item} disableGutters key={'technical'}>
			<Button className={classes.button} component={CustomRouterLink} to={{hash: location.hash, pathname: '/docs/technical' }}> Technical documentation </Button>
		</ListItem>
      
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  // pages: PropTypes.array.isRequired
};

export default SidebarNav;
