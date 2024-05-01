const express = require('express')
const app = express()
const router = express.Router();
const questions = require("../data/data.json")

router.get(`/getquestions`, async (req, res) => {
  try {
    // const questions = await Quiz.find({});
    res.json(questions)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }
})

router.post('/check', (req, res) => {
  try {
    const  {answers}  = req.body;
    let score = 0;
    console.log(answers)
    questions.forEach((question, index) => {
      if (question.answer === answers[index]) {
        score++;
      }
    });
    res.json({score});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }
})

module.exports = router;