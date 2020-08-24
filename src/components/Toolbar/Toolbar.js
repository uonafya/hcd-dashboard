import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography, Chip } from '@material-ui/core';
import { ouLevels, humanizePe, justFetch } from 'common/utils';
import { SearchInput } from 'components';
import {programs} from 'hcd-config';

const activProgId = parseFloat(localStorage.getItem('program')) || 1;
const activProg = programs.filter(pr => pr.id == activProgId)[0];
const endpts = activProg.endpoints;

const abortRequests = new AbortController();

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1),
    justifySelf: 'right'
  }
}));

const Toolbar = props => {
  let { title, pe, ou, lvl, className, filter_params, ...rest } = props;

  if (ou == null || ou == undefined || ou == '~') {
    ou = 'HfVjCurKxh2';
  }

  if (
    filter_params &&
    filter_params.ou != null &&
    filter_params.ou != '' &&
    filter_params.ou != undefined
  ) {
    ou = filter_params.ou;
  }
  if (
    filter_params &&
    filter_params.pe != null &&
    filter_params.pe != '' &&
    filter_params.pe != undefined
  ) {
    pe = filter_params.pe;
  }

  if (pe && pe.search('_') > 0) {
    pe = pe
      .replace('_', ' ')
      .replace('_', ' ')
      .replace('_', ' ');
  } else if (pe && pe.search(';') > 0) {
    let pe_ar = pe.split(';');
    pe = `${humanizePe(pe_ar[0])} - ${humanizePe(pe_ar[pe_ar.length - 2])}`;
  }else{
	  pe = humanizePe(pe)
  }

  const [ou_name, setOUname] = useState('');

  const getOUname = async o_u => {
	  let url = endpts.find(ep=>ep.name=='Organisation unit details')[process.env.REACT_APP_ENV == "dev" ? "local_url": "url"]+'/'+o_u
	  if(process.env.REACT_APP_ENV == 'dev'){
		  url = `${endpts.find(ep=>ep.name=='Organisation unit details').local_url}/${o_u}`
		}else{
			url = `${endpts.find(ep=>ep.name=='Organisation unit details').url}/${o_u}.json`
	  }
    if (o_u != undefined) {
      justFetch(url, { signal: abortRequests.signal })
        .then(reply => {
          let nm = reply.fetchedData.name;
          if (nm != undefined) {
            setOUname(nm);
          }
        })
        .catch(err => {
          return false;
        });
    }
  };

  useEffect(() => {
    getOUname(ou);

    return () => {
      // console.log(`toolbar aborting`);
      // abortRequests.abort()
    };
  }, [ou]);

  let lvlabel = lvl;
  if (lvl != undefined && lvl != '' && lvl != null) {
    lvlabel = ouLevels.find(l => l.id == lvl).name;
  }

  const classes = useStyles();

  

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <Typography variant="h3">{title}</Typography>
        <span className={classes.spacer} />
        {/* filters */}
        <Chip
          label={ou_name}
          className={ou != '' && ou != null ? '' : 'hidden'}
        />
        &nbsp;
        <Chip label={pe} className={pe != '' && pe != null ? '' : 'hidden'} />
        &nbsp;
        {/* filters */}
        {/* <Button className={classes.exportButton}>Export</Button> */}
        {/* <SearchInput className={classes.searchInput} placeholder="Search" /> */}
      </div>
    </div>
  );
};

export default Toolbar;
