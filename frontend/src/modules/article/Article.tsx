import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setArticles } from './articleSlice';
import { IState } from '../../redux/types';
import styles from './Article.module.css';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    backgroundColor: '#B4B4B4'
  },
  heading: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  add: {
    marginLeft: 'auto',
    marginRight: '8%'
  },
  article: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -31
  }
}));

export function Article() {
  const classes = useStyles();
  const {articles} = useSelector((state: IState)=> state.article);
  const dispatch = useAppDispatch();
  const [addArticle, setAddArticle] = useState(false)
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [selectedItem, setSelectedItem] = useState({
    id: null,
    body: null
  });

  useEffect(() => {
    axios.get(`/api/articles`)
      .then(res => {
        dispatch({
          type: setArticles,
          payload: res.data,
        });
      })
      .catch(error => console.log(error))
  },[dispatch])

  const handleAdd = () => {
    setEdit(false)
    setTitle(null);
    setBody(null);
    setAddArticle(true);
  }
  const handleClose = () => {
    setAddArticle(false);
  };
  const submitArticle = () => {
    let values = {
      title: title,
      body: body
    }
    axios.post('/api/articles/', values)
    .then(res => {
      setAddArticle(false);
    })
    .catch(error => console.log(error))
  };
  const handleChange = (event: any) => {
    setValue(event.target.value);
    event.target.id === "title" && setTitle(event.target.value);
    event.target.id === "body" && setBody(event.target.value);
  };

  const handleEdit = (values: any) => {
    setEdit(true)
    setTitle(values.title);
    setBody(values.body);
    setAddArticle(true);
    setSelectedItem(values);
  }
  const updateArticle = () => {
    if(selectedItem.id && selectedItem.body){
      let values = {
        id: selectedItem.id,
        title: title,
        body: selectedItem.body
      }
      axios.put(`/api/articles/${values.id}/`, values)
      .then(res => {
        setAddArticle(false);
      })
      .catch(error => console.log(error))
    }
  };

  return (
    <div className={styles.row}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Paper style={{display: 'flex'}}>
            <Grid item xs={3}>
              <Typography>All Articles</Typography>
            </Grid>
            <Button className={classes.add} onClick={handleAdd}>
              Add Article
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10} className={classes.article}>
          {articles && articles.map((article, index)=>(
            <Box mt={5} key={index}>
              <Box className={classes.heading}>
                <Paper className={`${classes.paper} ${classes.card} ${classes.heading}`}
                 style={{display: 'flex'}}>
                  {article.id} {article.title}
                  <Button className={classes.add} onClick={(e) => handleEdit(article)}>
                    Edit
                  </Button>
                </Paper>
              </Box>
              <Box>
                <Paper className={classes.paper}>{article.body}</Paper>
              </Box>
            </Box>
            
          ))}
        </Grid>
        <Dialog open={addArticle} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              value={title}
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="body"
              label="Body"
              value={body}
              type="text"
              multiline
              rowsMax={4}
              fullWidth
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={edit? updateArticle : submitArticle} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
}
