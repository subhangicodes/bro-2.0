const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/usertracking");

const pageSchema = new mongoose.Schema({
  pageUrl: String},
  {timestamps: true},
);
const Page = mongoose.model("Page", pageSchema);

const likeSchema = new mongoose.Schema({
  itemId: String,
},
  {timestamps:true},
);
const Like = mongoose.model("Like", likeSchema);

app.post('/api/pageview',async(req,resp)=>{
  console.log(req.query);
   if (!pageUrl) {
    return res.status(400).send({ success: false, message: 'pageUrl is required' });
  }

  const {pageUrl}=req.body;
  const viewPage=new Page({pageUrl});
  await viewPage.save();
  resp.send({success:true,message:'Page view recorded!'})
});

app.post('/api/likepage',async(req,resp)=>{
    const {itemId}=req.body;
    const likePage=new Like({itemId});
    await likePage.save();
    resp.send({success:true,message:'like recorded!'})
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
