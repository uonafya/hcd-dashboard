import React, { useState, useEffect } from 'react';
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
import Alert from '@material-ui/lab/Alert';
import {programs} from 'hcd-config';

const queryString = require('query-string');
const abortRequests = new AbortController();
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

  const [err, setErr] = useState({error: false, msg: ''});
  const [counties, setCounties] = useState([])
  const [subcounties, setSubcounties] = useState([])
  const [wards, setWards] = useState([])
  const [facilities, setFacilities] = useState([])
  const [c_units, setCUnits] = useState([])

  const location = useLocation();
  const histo = useHistory();

  const [notifications] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  let current_filter_params = queryString.parse(location.hash)
  const [per, setPer] = React.useState(current_filter_params.pe);
  const [ogu, setOU] = React.useState(current_filter_params.ou);
  const [levell, setLvl] = React.useState(current_filter_params.level);
  const prog_title = programs.filter( pr=>{const iid = parseFloat( sessionStorage.getItem("program") ) || 1; return pr.id==iid} )[0].name || "Malaria"
  const [progTitle, setProgTitle] = React.useState(prog_title)
  const [loading, setLoading] = React.useState(false);

  //----------------------- 

  let fetchCounties = async ()=>{
    try {
      let cties = [{level: 1, name: "Kenya (National)", id: "HfVjCurKxh2"}]
	  setLoading(true)
		fetch("http://41.89.94.99:3000/api/common/counties", {signal: abortRequests.signal}).then(ad=>ad.json()).then(reply=>{
			reply.fetchedData.organisationUnits.map( cty=>{
				cties.push(cty)
			})
			setCounties(cties)
			setLoading(false)
		}).catch(err=>{
			setErr({error: true, msg: 'Error fetching counties', ...err})
		})
    } catch (er) {
      setErr({error: true, msg: 'Error fetching counties'})
    }
  }
  
  let fetchSubcounties = async (countyid)=>{
	  let the_url
	  setLoading(true)
	  if(countyid && countyid.length>5){the_url=`http://41.89.94.99:3000/api/common/subcounties/${countyid}`}else{the_url = "http://41.89.94.99:3000/api/common/subcounties"}
    try {
		fetch(the_url, {signal: abortRequests.signal}).then(ad=>ad.json()).then(reply=>{
			// let subc = reply.fetchedData.organisationUnits.filter(rp=>rp.parent.id == countyid)
			let subc = reply.fetchedData.organisationUnits
			setSubcounties([])
			setSubcounties(subc)
			setLoading(false)
		}).catch(err=>{
			setErr({error: true, msg: 'Error fetching subcounties', ...err})
		})
    } catch (er) {
      setErr({error: true, msg: 'Error fetching subcounties'})
    }
  }
  
  let fetchWards = async (subcountyid)=>{
		let the_url
		setLoading(true)
		if(subcountyid && subcountyid.length>5){the_url=`http://41.89.94.99:3000/api/common/wards/${subcountyid}`}else{the_url = "http://41.89.94.99:3000/api/common/wards"}
    	try {
		fetch(the_url, {signal: abortRequests.signal}).then(ad=>ad.json()).then(reply=>{
			// let wds = reply.fetchedData.organisationUnits.filter(rp=>rp.parent.id == subcountyid)
			let wds = reply.fetchedData.organisationUnits
			setWards([])
			setWards(wds)
			setLoading(false)
		}).catch(err=>{
			setErr({error: true, msg: 'Error fetching wards', ...err})
		})
    } catch (er) {
      setErr({error: true, msg: 'Error fetching wards'})
    }
  }
  
  let fetchFacilities = async (wardid)=>{
		let the_url
		setLoading(true)
		if(wardid && wardid.length>5){the_url=`http://41.89.94.99:3000/api/common/facilities/${wardid}`}else{the_url = "http://41.89.94.99:3000/api/common/facilities"}
		try {
			fetch(the_url, {signal: abortRequests.signal}).then(ad=>ad.json()).then(reply=>{
				// let facs = reply.fetchedData.organisationUnits.filter(rp=>rp.parent.id == wardid)
				let facs = reply.fetchedData.organisationUnits
				setFacilities([])
				setFacilities(facs)
				setLoading(false)
			}).catch(err=>{
				setErr({error: true, msg: 'Error fetching facilities', ...err})
			})
		} catch (er) {
			setErr({error: true, msg: 'Error fetching facilities'})
		}
  }
  
  let fetchCUnits = async (facilityid)=>{
	  let the_url
	  setLoading(true)
	  if(facilityid && facilityid.length>5){the_url=`http://41.89.94.99:3000/api/common/facilities/${facilityid}`}else{the_url = "http://41.89.94.99:3000/api/common/facilities"}
    try {
		fetch(the_url, {signal: abortRequests.signal}).then(ad=>ad.json()).then(reply=>{
			// let cunits = reply.fetchedData.organisationUnits.filter(rp=>rp.parent.id == wardid)
			let cunits = reply.fetchedData.organisationUnits
			setCUnits([])
			setCUnits(cunits)
			setLoading(false)
		}).catch(err=>{
			setErr({error: true, msg: 'Error fetching community units', ...err})
		})
    } catch (er) {
      setErr({error: true, msg: 'Error fetching community units'})
    }
  }
  
  useEffect(() => {
	fetchCounties()

    return () => {
		// console.log(`topbar aborting`);
		// abortRequests.abort()
	}
  }, [])  
  
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
      // setLoading(histo.push({pathname: location.pathname, hash: `ou=${orgu}&pe=${perio}&level=${levl}`}))
      if( histo.push(`${location.pathname}#ou=${orgu}&pe=${perio}&level=${levl}`) ){
        setLoading(true)
      }else{
        setLoading(false)
      }
    } catch (er) {}
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


  // switch programs
	const switchProgram = (progId)=>{
		const newActiveProg = programs.filter(pg=>pg.id==progId)[0]
		setProgTitle(newActiveProg.name)
		sessionStorage.setItem("program", progId)
		window.location.reload();
	}
  // switch programs

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar variant="regular">
        
        <RouterLink to="/">
          <h3 className="fcwhite">
              <img src={Logo} className="mainlogo max-h-50-px m-r-5"/> 
              <Hidden smDown>HCD: </Hidden>
              &nbsp;
              <Hidden smDown><span className="text-caps">{progTitle}</span></Hidden>
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
				{loading ? (
					<Alert severity="info">Loading...</Alert>
				) : (
					<>
						<Autocomplete size="small" id="pick-county" disableClearable={true} options={counties} getOptionLabel={option => {return option.name}} style={{ width: 300 }}
						renderInput={params => (
							<TextField {...params} label="Select a county" variant="outlined" fullWidth />
						)}
						onChange={(r, value)=>{
							let cty = r.target.innerHTML
							if(value){
							setOU(value.id)
							fetchSubcounties(value.id)
							handleChange(per, value.id, levell)
							}
						}}
						/>
						<br/>
						<Autocomplete size="small" id="pick-subcounty" disableClearable={true} options={subcounties} getOptionLabel={option => {return option.name}} style={{ width: 300 }}
						renderInput={params => (
							<TextField {...params} label="Select a subcounty" variant="outlined" fullWidth />
						)}
						onChange={(r, value)=>{
							let scty = r.target.innerHTML
							if(value){
							setOU(value.id)
							fetchWards(value.id)
							handleChange(per, value.id, levell)
							}
						}}
						/>
						<br/>
						<Autocomplete size="small" id="pick-ward" disableClearable={true} options={wards} getOptionLabel={option => {return option.name}} style={{ width: 300 }}
						renderInput={params => (
							<TextField {...params} label="Select a ward" variant="outlined" fullWidth />
						)}
						onChange={(r, value)=>{
							let scty = r.target.innerHTML
							if(value){
							setOU(value.id)
							fetchFacilities(value.id)
							handleChange(per, value.id, levell)
							}
						}}
						/>
						<br/>
						<Autocomplete size="small" id="pick-facility" disableClearable={true} options={facilities} getOptionLabel={option => {return option.name}} style={{ width: 300 }}
						renderInput={params => (
							<TextField {...params} label="Select a facility" variant="outlined" fullWidth />
						)}
						onChange={(r, value)=>{
							let scty = r.target.innerHTML
							if(value){
							setOU(value.id)
							handleChange(per, value.id, levell)
							}
						}}
						/>
					</>
				)}
                <br/>
                {/* <Button variant="contained" color="primary" >Apply</Button> */}
              </div>
            </Popover>
            {/* ---------------------------------- */}
            &nbsp; &nbsp;
            
            {/* ---------------------------------- */}
            <Monthpicker format='MM.yyyy' onChange={periodFrom} locale="en" primaryColor="#01579b">
              <Button variant="contained" disableElevation color="secondary" id="per_btn">
                <Hidden mdUp><CalendarTodayOutlined size="small"/></Hidden>
                <Hidden smDown> Period &#9662; </Hidden>
              </Button>
            </Monthpicker>
            {/* ----------------</FILTER>------------------ */}         
        </div>
        
        &nbsp; &nbsp;
        
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~ appswitcher ~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <Button variant="contained" disableElevation color="default" aria-describedby={id2} onClick={handleClick2} id="app_btn" size="large">
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
				{programs.map( op=>(
					<ListItem component="a" button divider key={op.id} onClick={()=>{switchProgram(op.id)}}>
						<ListItemAvatar><FolderOpenTwoTone/></ListItemAvatar>
						<ListItemText primary={op.name} secondary={op.owner} primaryTypographyProps={{"variant": "h5"}}/>
						<ListItemSecondaryAction> <ArrowForward fontSize="small"/> </ListItemSecondaryAction>
					</ListItem>
				) )}
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

export default Topbar;
