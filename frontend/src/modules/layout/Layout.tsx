import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Article } from '../article/Article';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function Layout() {
  const classes = useStyles();
  
  return (
    <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Dream Blog
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Article />
        </Grid>
    </Grid>
  );
}
