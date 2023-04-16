import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";

import chatidmap from "./chatidmap.js";
import chatagent from './chatagent.js';
import weworkcmd from './weworkcmd.js';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const robot_id = process.env.ROBOT_ID;

app.get('/', (req, res) => {
  res.send('Hello World! test updating, now on hongkong!!');
})

// for chat from client
app.post("/chatapi/chat", async (req, res) => {
  let data = req.body;
  console.log(data);
  //roomType integer 必需 QA所在房间类型 1=外部群 2=外部联系人 3=内部群 4=内部联系人
  const chatid = await chatidmap.obj2id(data);
  let resdata = {
    "code": 0,
    "message": "string",
    "data": {
      "type": 0,
      "info": {
        "text": "string"
      }
    }};
  chatagent.agent(chatid, data.spoken).then(async(r)=>{
    console.log(r);
    const chatinfo = await chatidmap.id2obj(r.chatid);
    return await weworkcmd.send(chatinfo, r.msg);
  }).then(r=>{console.log("chatgpt response send!")}).catch(e=>console.log(e));
  res.send(JSON.stringify(resdata));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
