import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory, Redirect } from "react-router-dom";
import WordCloud from "../WordCloud/wordcloud";
import ChatBot from "../Chatbot/chatbot";
import MachineLearning from "../MachineLearning/ML";
import Insights from "../Visualization/insights";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Homepage() {

  const classes = useStyles();
  
  const history = useHistory();
  const [CH, setCH] = React.useState(false);
  const [WC, setWC] = React.useState(false);
  const [ML, setML] = React.useState(false);
  const [insights, setInsights] = React.useState(false);

  const handleChat = () => {
    setCH(true);
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("question")
    history.push({
      pathname: '/',
    })
  }

  const handleWordCloud = () => {
    setWC(true);
  }

  const handleSimilarity = () => {
    setML(true);
  }

  const handleInsights = () => {
    setInsights(true);
  }
  
  if (!localStorage.getItem("user"))
  {
    return(
    <Redirect to path="/" ></Redirect>
    );
  }
  else{
  if(JSON.parse(localStorage.getItem("user")).type === 'Customer')
{
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          HalifaxFoodie 
        </Typography>
        <Button color="inherit" onClick={handleInsights} >Insights</Button>
        <Button color="inherit" onClick={handleChat} >Chat</Button>
        <Button color="inherit" onClick={handleLogout} >Logout</Button>
      </Toolbar>
    </AppBar>
    {CH ? (
        <React.Suspense fallback={<h1>loading....</h1>}> 
          <ChatBot/>
        </React.Suspense>
      ) : null}

    {insights ? (
            <React.Suspense fallback={<h1>loading....</h1>}> 
            <Insights/>
          </React.Suspense>
        ) : null}
    </div>
  )
}
else{
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          HalifaxFoodie
        </Typography>
        <Button color="inherit" onClick={handleWordCloud} >WordCloud</Button>
        <Button color="inherit" onClick={handleSimilarity} >Similarity</Button>
        <Button color="inherit" onClick={handleChat} >Chat</Button>
        <Button color="inherit" onClick={handleLogout} >Logout</Button>
      </Toolbar>
    </AppBar>

    {WC ? (
        <React.Suspense fallback={<h1>loading....</h1>}> 
          <WordCloud/>
        </React.Suspense>
      ) : null}

    {ML ? (
        <React.Suspense fallback={<h1>loading....</h1>}> 
          <MachineLearning/>
        </React.Suspense>
      ) : null}

    {CH ? (
        <React.Suspense fallback={<h1>loading....</h1>}> 
          <ChatBot/>
        </React.Suspense>
      ) : null}
    </div>
  )
}
}
}

export default Homepage;
