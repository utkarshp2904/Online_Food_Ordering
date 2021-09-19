import LexChat from "react-lex";
import { Component } from "react";

export default class ChatBot extends Component {
    render() {
        return (
            <LexChat
                botName="HalifaxFoodie"
                IdentityPoolId="us-east-1:1fc79758-a513-48d0-8666-930bc1b8925e"
                placeholder="Placeholder text"
                backgroundColor="#FFFFFF"
                height="430px"
                region="us-east-1"
                headerText="bot"
                headerStyle={{ backgroundColor: "lightblue", fontSize: "20px" }}
                greeting={
                    "Hello, how can I help? You can say things like 'help' to get more info"
                }
            />
        );
    }
}