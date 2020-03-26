import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, TextField, Link, Button, Popover, Typography, Snackbar, List, ListItemAvatar, ListItemIcon, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuIcon from '@material-ui/icons/Menu';
import {NotificationsOutlined, CalendarTodayOutlined, PinDropOutlined, Apps, FolderOpenTwoTone, ArrowForward} from '@material-ui/icons';
import Monthpicker from '@compeon/monthpicker'
import Logo from 'assets/images/moh.png'

const queryString = require('query-string');

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  flexO: {
    flexGrow: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const counties = [
    {"name":"Baringo County","id":"vvOK1BxTbet"},{"name":"Bomet County","id":"HMNARUV2CW4"},{"name":"Bungoma County","id":"KGHhQ5GLd4k"},{"name":"Busia County","id":"Tvf1zgVZ0K4"},{"name":"Elgeyo-Marakwet County","id":"MqnLxQBigG0"},{"name":"Embu County","id":"PFu8alU2KWG"},{"name":"Garissa County","id":"uyOrcHZBpW0"},{"name":"Homa Bay County","id":"nK0A12Q7MvS"},{"name":"Isiolo County","id":"bzOfj0iwfDH"},{"name":"Kajiado County","id":"Hsk1YV8kHkT"},{"name":"Kakamega County","id":"BjC1xL40gHo"},{"name":"Kericho County","id":"ihZsJ8alvtb"},{"name":"Kiambu County","id":"qKzosKQPl6G"},{"name":"Kilifi County","id":"nrI2khZx3d0"},{"name":"Kirinyaga County","id":"Ulj33KBau7V"},{"name":"Kisii County","id":"sPkRcDvhGWA"},{"name":"Kisumu County","id":"tAbBVBbueqD"},{"name":"Kitui County","id":"j8o6iO4Njsi"},{"name":"Kwale County","id":"N7YETT3A9r1"},{"name":"Laikipia County","id":"xuFdFy6t9AH"},{"name":"Lamu County","id":"NjWSbQTwys4"},{"name":"Machakos County","id":"yhCUgGcCcOo"},{"name":"Makueni County","id":"BoDytkJQ4Qi"},{"name":"Mandera County","id":"R6f9znhg37c"},{"name":"Marsabit County","id":"Eey8fT4Im3y"},{"name":"Meru County","id":"Y52XNJ50hYb"},{"name":"Migori County","id":"fVra3Pwta0Q"},{"name":"Mombasa County","id":"wsBsC6gjHvn"},{"name":"Muranga County","id":"ahwTMNAJvrL"},{"name":"Nairobi County","id":"jkG3zaihdSs"},{"name":"Nakuru County","id":"ob6SxuRcqU4"},{"name":"Nandi County","id":"t0J75eHKxz5"},{"name":"Narok County","id":"kqJ83J2D72s"},{"name":"Nyamira County","id":"uepLTG8wGWJ"},{"name":"Nyandarua County","id":"mYZacFNIB3h"},{"name":"Nyeri County","id":"ptWVfaCIdVx"},{"name":"Samburu County","id":"o36zCRjSd4G"},{"name":"Siaya County","id":"u4t9H8XyU9P"},{"name":"Taita Taveta County","id":"QyGNX2DpR4h"},{"name":"Tana River County","id":"JsH2bnvNt2d"},{"name":"Tharaka Nithi County","id":"T4urHM47nlm"},{"name":"Trans-Nzoia County","id":"mThvosEflAU"},{"name":"Turkana County","id":"kphDeKClFch"},{"name":"Uasin Gishu County","id":"pZqQRRW7PHP"},{"name":"Vihiga County","id":"sANMZ3lpqGs"},{"name":"Wajir County","id":"CeLsrJOH0g9"},{"name":"West Pokot County","id":"XWALbfAPa6n"}
  ]


  const location = useLocation();
  const hist = useHistory();

  const [notifications] = useState([]);

  //----------------------- 
  const [anchorEl, setAnchorEl] = React.useState(null);
  let current_filter_params = queryString.parse(location.hash)
  const [per, setPer] = React.useState(current_filter_params.pe);
  const [ogu, setOU] = React.useState(current_filter_params.ou);
  const [levell, setLvl] = React.useState(current_filter_params.level);
  const [loading, setLoading] = React.useState(false);
  
  
  const handleChange = (perio, orgu, levl) => {
    setLoading(true)
    if(levl == null || levl == '' || levl == undefined){
      levl = current_filter_params.level
      if(levl == null || levl == '' || levl == undefined){ levl = '~' }
    }
    if(perio == null || perio == '' || perio == undefined){
      perio = current_filter_params.pe
      if(perio == null || perio == '' || perio == undefined){ perio = '~' }
    }
    if(orgu == null || orgu == '' || orgu == undefined){
      orgu = current_filter_params.ou
      if(orgu == null || orgu == '' || orgu == undefined){ orgu = '~' }
    }
    try {
      setLoading(hist.push({pathname: location.pathname, hash: `#ou=${orgu}&pe=${perio}&level=${levl}`}))
    } catch (er) {
    }
  }
  //----------------------- 
  
  //----------------------- monthpicker
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'pick-ou' : undefined;

  const handleClick2 = event => {
    setAnchorEl2(event.currentTarget);
  };
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? 'pick-pe' : undefined;


  const periodFrom = (d) => {
    let period = d.split(".")[1]+""+d.split(".")[0]
    let mnths = [ {id:"01",name:"Jan"},{id:"02",name:"Feb"},{id:"03",name:"Mar"},{id:"04",name:"Apr"},{id:"05",name:"May"},{id:"06",name:"Jun"},{id:"07",name:"Jul"},{id:"08",name:"Aug"},{id:"09",name:"Sept"},{id:"10",name:"Oct"},{id:"11",name:"Nov"},{id:"12",name:"Dec"} ]
    // document.getElementById("per_btn").innerHTML = mnths.filter(mn=>{ return mn.id==d.split(".")[0]})[0].name + " " +  d.split(".")[1] + " &#9662;"
    setPer(period)
    handleChange(period, ogu, levell)
  }
  //----------------------- monthpicker

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar variant="regular">
        
        <RouterLink to="/">
          <h3 className="fcwhite">
              <img src={Logo} className="mainlogo max-h-50-px m-r-5"/> 
              <Hidden smDown>GCD: </Hidden>
              &nbsp;
              <Hidden smDown>MALARIA</Hidden>
          </h3>
        </RouterLink>

        <div className={classes.flexO}>
          <Hidden smDown ><span style={{'color': 'grey'}}>Filter: &nbsp;</span></Hidden>
            {/* ----------------<FILTER>------------------ */}
            <Button variant="contained" disableElevation color="secondary" aria-describedby={id} onClick={handleClick} id="cty_btn">
              <Hidden mdUp><PinDropOutlined size="small"/></Hidden>
              <Hidden smDown>Organisation Unit &#9662; </Hidden>
            </Button>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
              transformOrigin={{ vertical: 'top', horizontal: 'center', }}
            >
              <div className="p-20">
                <label>Filter:</label><br className="m-b-10"/>
                <Autocomplete size="small" id="pick-county" options={counties} getOptionLabel={option => option.name} style={{ width: 300 }}
                  renderInput={params => (
                    <TextField {...params} label="Select a county" variant="outlined" fullWidth />
                  )}
                  onChange={(r, value)=>{
                    let cty = r.target.innerHTML
                    setOU(value.id)
                    handleChange(per, value.id, levell)
                  }}
                />
                <br/>
                <Autocomplete size="small" disabled id="pick-subcounty" options={counties} getOptionLabel={option => option.name} style={{ width: 300 }}
                  renderInput={params => (
                    <TextField {...params} label="Select a subcounty" variant="outlined" fullWidth />
                  )}
                  onChange={(r, value)=>{
                    let scty = r.target.innerHTML
                    console.log(value)
                    setOU(value)
                    handleChange(per, value, levell)
                  }}
                />
                <br/>
                {/* <Button variant="contained" color="primary" >Apply</Button> */}
              </div>
            </Popover>
            {/* ---------------------------------- */}
            &nbsp; &nbsp;
            
            {/* ---------------------------------- */}
            <Monthpicker format='MM.YYYY' onChange={periodFrom} locale="en">
              <Button variant="contained" disableElevation color="secondary" id="per_btn">
                <Hidden mdUp><CalendarTodayOutlined size="small"/></Hidden>
                <Hidden smDown> Period &#9662; </Hidden>
              </Button>
            </Monthpicker>
            {/* ----------------</FILTER>------------------ */}         
        </div>
        
        &nbsp; &nbsp;
        
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~ appswitcher ~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Button variant="contained" disableElevation color="white" aria-describedby={id2} onClick={handleClick2} id="app_btn" size="large">
          <Apps size="small"/> &nbsp;
          <Hidden smDown>Programs &#9662; </Hidden>
        </Button>
        <Popover id={id2} open={open2} anchorEl={anchorEl2} onClose={handleClose2}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
          transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        >
          <div className="p-10">
            <Typography variant="h5" className="m-b-5">Switch Program Dashboards:</Typography>
            <Divider className="m-t-10 m-b-0 p-0"/>
            <List component="nav" dense={false} className="m-t-0">
              <ListItem component="a" href="#" button divider>
                <ListItemIcon><FolderOpenTwoTone/></ListItemIcon>
                <ListItemText primary="Malaria Programme" secondary="DNMP" primaryTypographyProps={{"variant": "h5"}}/>
                <ListItemSecondaryAction> <ArrowForward fontSize="small"/> </ListItemSecondaryAction>
              </ListItem>
              <ListItem component="a" href="#" button divider>
                <ListItemAvatar><FolderOpenTwoTone/></ListItemAvatar>
                <ListItemText primary="Family Planning Programme" secondary="FP Department" primaryTypographyProps={{"variant": "h5"}}/>
                <ListItemSecondaryAction> <ArrowForward fontSize="small"/> </ListItemSecondaryAction>
              </ListItem>
              <ListItem component="a" href="#" button divider>
                <ListItemAvatar><FolderOpenTwoTone/></ListItemAvatar>
                <ListItemText primary="Nutrition Programme" secondary="Nutrition Department" primaryTypographyProps={{"variant": "h5"}}/>
                <ListItemSecondaryAction> <ArrowForward fontSize="small"/> </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Popover>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~ appswitcher ~~~~~~~~~~~~~~~~~~~~~~~~ */}


        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>

      </Toolbar>
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center', }} open={loading} autoHideDuration={90000} message="Loading..." />
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
