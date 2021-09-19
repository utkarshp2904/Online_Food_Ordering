import React, { useEffect , useState} from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';
import axios from "axios";
import 'react-chat-widget/lib/styles.css';


function App() {

  const [value,setValue] = useState();
  const sub = "piyush"
  useEffect(() => {
    SubCall()
    console.log(value)
  })

  async function SubCall() {
    console.log("SubCall called");
    while (true) {
      await axios
        .get(
          `https://us-central1-csci-5410-s21-314811.cloudfunctions.net/getmessages/${sub}`
        )
        .then((res) => {
          console.log(res.data)
          if (res.data.length) {
            addResponseMessage(String(res.data))
          }
        })
        .catch((error) => { console.log(error) })
      await new Promise((r) => setTimeout(r, 5000));
    }

  }

  async function PubCall(message) {
    console.log("PubCall called")
    await axios
      .post(
        "https://us-central1-csci-5410-s21-314811.cloudfunctions.net/publishmsg",
        {"text": message,
          "topic": value}
      )
      .then((res) => console.log("publisher res data", res.data))
      .catch((err) => console.log("publisher err data", err));
  }

  const handleNewUserMessage = (newMessage) => {
    PubCall(newMessage +"( from "+sub+" )");
  };

  return (
    <div>
      <div>
      <h6>User</h6>
      <h1>Which service are you interested in?</h1>
        <select name="selectList" id="selectList" onChange={(e)=>setValue(e.target.value)}>
          <option value="halifaxfoodie">Representative</option>
          <option value="starbuck">Starbuck</option>
        </select>
      </div>
      <div className="App">
        <Widget
          title="HalifaxFoodie"
          subtitle="Chat with our reprsentative or the restaurant"
          handleNewUserMessage={handleNewUserMessage} />
      </div>
    </div>
  );
}

export default App;