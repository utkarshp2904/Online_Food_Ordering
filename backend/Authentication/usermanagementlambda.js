const express = require("express");
const aws = require("aws-sdk");
const serverless = require("serverless-http");
const cors = require('cors');
const documentClient = new aws.DynamoDB.DocumentClient({
  region: "us-east-1",
});
const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const body = JSON.parse(req.apiGateway.event.body);
  const name = body.name;
  const email = body.email;
  const password = body.password;
  const type = body.type;

  console.log(name, email, password, type);

  const postparams = {
    TableName: "user",
    Item: {
      email: email,
      name: name,
      password: password,
      type: type,
    },
  };
  const getparams = {
    TableName: "user",
    Key: {
      email: email,
    },
  };
  const data = await documentClient.get(getparams).promise();
  console.log(data);
  if (Object.keys(data).length === 0) {
    const userdata = await documentClient.put(postparams).promise();
    res.send({
      status: 200,
      message: "successful",
      data: userdata,
    });
  } else {
    res.send({
      status: 400,
      message: "Email is present please use another email",
    });
  }
});

app.post("/login", async (req, res) => {
  const body = JSON.parse(req.apiGateway.event.body);
  const email = body.email;
  const password = body.password;
  console.log(email, password);
  const getparams = {
    TableName: "user",
    Key: {
      email: email,
    },
  };
  const data = await documentClient.get(getparams).promise();
  console.log("data", data);
  if (Object.keys(data).length === 0) {
    res.send({
      status: 404,
      message: "User Not Found",
    });
  } else if (data.Item.email === email && data.Item.password === password) {
    res.send({
      status: 200,
      message: "successful",
      data: {
          email: data.Item.email,
          type: data.Item.type

      },
    });
  } else {
    res.send({
      status: 400,
      message: "Email or password is incorrect",
    });
  }
});

module.exports.handler = serverless(app);
