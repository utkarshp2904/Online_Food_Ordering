const express = require("express");
const cors = require('cors');


    const app = express();
    app.use(cors());
    app.use(express.json());


    app.get('/:sub', function (req, res) {

        let reply=[]

        const subscriptionName = req.params.sub;
        console.log("subscriptionName", subscriptionName);
        const { PubSub } = require("@google-cloud/pubsub");
        const timeout = 30;

        const pubSubClient = new PubSub();

        try {
            console.log('entered')
            function listenForMessages() {
                const subscription = pubSubClient.subscription(subscriptionName);
                let messageCount = 0;
                const messageHandler = message => {
                    console.log(`Received message ${message.id}:`);
                    console.log(`\tData: ${message.data}`);
                    console.log(`\tAttributes: ${message.attributes}`);
                    reply.push(message.data.toString())
                    messageCount += 1;
                    message.ack();
                };
                subscription.on('message', messageHandler);

                setTimeout(() => {
                    subscription.removeListener('message', messageHandler);
                    console.log(`${messageCount} message(s) received.`);
                    console.log(reply)
                    return res.status(200).send(reply)
                }, timeout * 1000);
            }

            listenForMessages();
        } catch (e) {
            console.log("exception", e);
            res.status(400).send("failed");
        }
    })
app.listen(3001, () => console.log("listen on: 3001"));

module.exports = { app }



