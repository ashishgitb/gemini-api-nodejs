const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();
const express = require('express');
const bodyParser=require('body-parser');
const app = express();
app.use(express.json());


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




const prompt = "who are you?";
const generate = async(prompt)=>{try{
  const res = await model.generateContent(prompt);
  console.log(res.response.text());
  return res.response.text();
}catch(err){
 console.log(err)
}}

app.get('/', (req, res) => {
  res.send("Hello Raja");
});
// AI generation endpoint
app.get('/api/content', async (req, res) => {
  try {
    const data = req.body.question;
    const result= await generate(data);
    res.send({
      "result":result
    })
  }catch(err){
    res.send("error:"+err);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
