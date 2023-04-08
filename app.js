const express = require("express");

const app = express();
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World! test updating');
})

// for chat
app.post("/chatapi",(req, res)=>{
    let data = req.body;
    console.log(data);
    let resdata = {
        "code": 0,
        "message": "string",
        "data": {
            "type": 0,
            "info": {
                "text": "string"
            }
        }
    };
    res.send(JSON.stringify(resdata));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
