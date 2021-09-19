const admin = require("firebase-admin");
const express = require("express");

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

app.post("/sequrityquestions", async (req, res, next) => {
  try {
    const content = req.body;
    console.log("req : ",req);
    console.log("content:", content);
    if (!content) {
      res.send({
        status: 400,
        message: "content is empty",
      });
    } else {
      const questions = content;
      console.log("id: ",questions.userId);
      console.log("question1:", questions.question1)
      const ref = await db.collection("questions").doc(questions.userId).set({
      "userId": questions.userId,
      "question1": questions.question1,
      "question2": questions.question2,
      "question3": questions.question3});
      res.send({
        status: 200,
        message: "success",
      });
    }
  } catch (e) {
    next(e);
  }
});

app.get("/sequrityquestion/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("userId : ", userId)
    if (!userId) {
      res.send({
        status: 400,
        message: "content is empty",
      });
    } else {
      const question = await db.collection("questions").doc(userId).get();
      console.log("questions: ", question)
      if (!question.exists) 
        {
          res.send({
            status: 400,
            message: "content is empty",
          });
        }
        res.send({
           message: "success", 
          "question1":question._fieldsProto.question1.stringValue,
          "question2":question._fieldsProto.question2.stringValue,
          "question3":question._fieldsProto.question3.stringValue,
        });
      }
    }
  catch (e) {
    next(e);
  }
});


module.exports = { app }
