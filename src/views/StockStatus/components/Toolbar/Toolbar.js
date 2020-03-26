import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography, Chip } from '@material-ui/core';
import {ouLevels} from '../../../../common/utils'

import { SearchInput } from 'components';

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
  },
}));

const Toolbar = props => {
  const { title, pe, ou, lvl, className, ...rest } = props;


  let lvlabel = lvl
  if(lvl != "" && lvl != null){lvlabel = ouLevels.find(l=>l.id == lvl).name}
  
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)} >
      <div className={classes.row}>
        <Typography variant="h3">{title}</Typography>
        <span className={classes.spacer} />
        {/* filters */}
        <Chip label={ou} className={ou != "" && ou != null ? "":"hidden"} />
        &nbsp;
        <Chip label={pe} className={pe != "" && pe != null ? "":"hidden"} />
        &nbsp;
        <Chip label={lvlabel} className={lvl != "" && lvl != null ? "":"hidden"} />
        {/* filters */}
        {/* <Button className={classes.exportButton}>Export</Button> */}
        {/* <SearchInput className={classes.searchInput} placeholder="Search" /> */}
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
