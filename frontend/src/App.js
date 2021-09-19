import "./App.css";
import Registration from "./component/Authentication/Registration";
import WordCloud from "./component/WordCloud/wordcloud";
import WordCloudImage from "./component/WordCloud/WordCloudImage";
import Login from "./component/Authentication/Login";
import ChatBot from "./component/Chatbot/chatbot";
import Homepage from "./component/homepage/homepage";
import { Route, BrowserRouter,Switch, Redirect} from "react-router-dom";
import ML from "./component/MachineLearning/ML";
       
function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register">
          <Registration></Registration>
          </Route> 
          <Route exact path = "/home">
         <Homepage></Homepage>
        </Route>
          {(localStorage.getItem("user") != undefined) ?
            <>
          <Route exact path="/WordCloud">
          <WordCloud></WordCloud>
        </Route>
        <Route exact path="/WordCloudImage">
          <WordCloudImage></WordCloudImage>
        </Route>
        <Route exact path ="/chatbot">
          <ChatBot />
        </Route>     
        <Route exact path ="/similarity">
          <ML/>
        </Route>
        </>
            : <Redirect to="/" />}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;



