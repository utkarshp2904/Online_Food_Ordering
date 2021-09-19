/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
   console.log("api called");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.set("Access-Control-Max-Age", "3600");

    console.log("req.body", req.body);

    if (req.method === "OPTIONS") {
        return res.status(204).send("Success");
    }

    if (req.body) {
        const msg = req.body.text;
        const topicName = req.body.topic;
        const { PubSub } = require("@google-cloud/pubsub");
        const pubSubClient = new PubSub();



        try {
            async function publishMessage() {
                const dataBuffer = Buffer.from(msg);
                try {
                    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
                    console.log(`Message ${messageId} published.`);
                } catch (error) {
                    console.error(`Received error while publishing: ${error.message}`);
                    process.exitCode = 1;
                }
            }
            publishMessage();
        } catch (e) {
            console.log("exception");
            return res.status(400).send("failed");
        }
    } else {
        return res.status(400).send("invalid request");
    }
};
