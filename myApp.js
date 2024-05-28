let express = require('express');
let app = express();
require('dotenv').config()

app.use(function middleware(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
  });

app.use(express.static(__dirname + "/public"))

app.use('/public', express.static(__dirname + "/public"))

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/views/index.html")
})


app.get("/json", (req,res)=>{

    if(process.env.MESSAGE_STYLE==="uppercase"){
         res.json({"message":"HELLO JSON"})
    }
    else{
        res.json({"message":"Hello json" })
    }
})

app.get('/now', function(req, res, next) {
    req.time = new Date().toString()  // Hypothetical synchronous operation
    next();
  }, function(req, res) {
    res.send({
        time : req.time
    }) 
  });

  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });

  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });

  app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;
    // Use template literals to form a formatted string
    res.json({
      name: `${firstName} ${lastName}`
    });
  });

 module.exports = app;
