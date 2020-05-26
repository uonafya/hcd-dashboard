import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Paper, Card, CardActionArea } from '@material-ui/core';
import { programs } from 'hcd-config';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  card: {
    padding: '15px'
  }
}));

const Landing = ({ history }) => {
  const classes = useStyles();

  const switchProgram = progId => {
    const newActiveProg = programs.filter(pg => pg.id == progId)[0];
    sessionStorage.setItem('program', progId);
    // window.location.reload();
    history.push('/dashboard');
  };

  const checkIfSet = () => {
    if (
      sessionStorage.getItem('program') === null ||
      sessionStorage.getItem('program') === undefined ||
      sessionStorage.getItem('program') === ''
    ) {
      console.log(`program is NOT set`);
    } else {
      history.push('/dashboard');
    }
  };

  useEffect(() => {
    checkIfSet();
    return () => {
      //cleanup
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={8} xs={12}>
          <div className={classes.content}>
            <Typography variant="h3">Pick a program:</Typography>
            <br />
            <Grid container spacing={3}>
              {programs.map(pg => (
                <Grid item sm key={pg.id}>
                  <a
                    href="#"
                    className={classes.classlink}
                    onClick={() => {
                      console.log(`switching to ${pg.name}`);
                      switchProgram(pg.id);
                    }}>
                    <Card>
						<CardActionArea className={classes.card}>
							<Typography variant="h4" className={classes.cardlink}>{pg.name}</Typography>
							<br />
							<Typography variant="h5" className="fcgrey-dark-3">({pg.owner})</Typography>
						</CardActionArea>
                    </Card>
                  </a>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
