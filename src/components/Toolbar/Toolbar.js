import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography, Chip, Grid } from '@material-ui/core';
import { ouLevels, humanizePe, justFetch } from 'common/utils';
import { SearchInput } from 'components';
import { programs } from 'hcd-config';

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
	marginBottom: theme.spacing(4),
	justifyContent: 'space-between'
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
  },
  meta: {

  },
  legends: {
	display: 'grid',
	gridTemplateColumns: 'repeat(4, auto)',
	rowGap: '5px',
	columnGap: '5px'
  },
  legend: {
	padding: '7px 5px',
	borderRadius: '3px',
	fontSize: '0.7rem',
	minWidth: '100px',
	textAlign: 'center'
  }
}));

const Toolbar = props => {
  let { title, pe, ou, lvl, className, filter_params, legends, ...rest } = props;

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
  } else {
    pe = humanizePe(pe);
  }

  const [ou_name, setOUname] = useState('Kenya');

  const getOUname = async o_u => {
    if (o_u == null || o_u == undefined || o_u == '~') {
      o_u = 'HfVjCurKxh2';
    }
    let url =
      endpts.find(ep => ep.name == 'Organisation unit details')[
        process.env.REACT_APP_ENV == 'dev' ? 'local_url' : 'url'
      ] +
      '/' +
      o_u;
    if (process.env.REACT_APP_ENV == 'dev') {
      url = `${
        endpts.find(ep => ep.name == 'Organisation unit details').local_url
      }/${o_u}`;
    } else {
      url = `${
        endpts.find(ep => ep.name == 'Organisation unit details').url
      }/${o_u}.json`;
    }
    if (o_u != undefined && o_u != '~' && o_u != 'HfVjCurKxh2') {
      justFetch(url, { signal: abortRequests.signal })
        .then(reply => {
          let nm = reply.fetchedData.name;
          if (nm != undefined) {
            setOUname(nm);
          }
        })
        .catch(err => {
          if (abortRequests.signal.aborted) {
            //if(err.name !== "AbortError"){
            return {
              error: true,
              msg: `Error fetching data: ' ${
                process.env.REACT_APP_ENV == 'dev' ? err.message : ''
              }`
            };
          } else {
            console.log('Cancelled getOUname');
          }
        });
    }
  };

  useEffect(() => {
    getOUname(ou);

    return () => {
      console.log(`toolbar aborting`);
      abortRequests.abort();
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
		{legends && legends.length > 0 ?
        <div>
			<Typography variant="h6">Legend:</Typography>
			<div className={classes.legends}>
				{legends && legends.map(lg=>
					<div className={classes.legend + ' ' + lg.class}>
						<span className={classes.legendColour}>&nbsp;</span>
						<span className={classes.legendText}>{lg.label}</span>
					</div>
				)}
			</div>
		</div>
		: "" }
		<div className={classes.meta}>
			<Chip
			label={ou_name}
			className={ou != '' && ou != null ? '' : 'hidden'}
			/>
			&nbsp;
			<Chip label={pe} className={pe != '' && pe != null ? '' : 'hidden'} />
			&nbsp;
		</div>
      </div>
    </div>
  );
};

export default Toolbar;
