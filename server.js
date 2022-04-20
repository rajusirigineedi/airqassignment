const express = require("express");
const User = require("./models/User");
const crypto = require("crypto");
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose');
const async = require("hbs/lib/async");
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// mogodb db connection
// ---------------------------------------------------------------------
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('DB connected successfully'))
.catch(error=>{
    console.log('DB connection failure');
    console.log(error);
    process.exit(1);
})
//-------------------------------------------------------------------------  


// Some middlewares ------------------------------------------------------
const app = express();
app.use(express.json());
app.use(jsonParser);
app.use(urlencodedParser);
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
app.use(express.static('public'))
//-------------------------------------------------------------------------  



app.get("/viewall", async (req, res) => {
  const resultPerPage = 3;
  const currentPage = (req.query.page || 1)*1;
  const skipVal = resultPerPage * (currentPage - 1);
  const allUsers = await User.find({}).limit(resultPerPage).skip(skipVal).select("email apiKey limit usage");
  res.render('allkeys', { layout: 'main', data: allUsers, prev: (currentPage == 1)?1:currentPage-1, next: currentPage+1});
});

app.get('/', async(req, res)=>{
    res.render('signup', {layout: 'main'})
});

app.post("/", async (req, res) => {
  const data = req.body;
  const apiKey = crypto.randomBytes(16).toString("hex");
  const newUser = await User.create({
    username: data.username,
    email: data.email,
    password: data.password,
    limit: data.limit,
    apiKey,
  });
    res.render('home', {layout: 'main', apiKey});
});

app.get("/getairq", async (req, res) => {
  if (!req.headers["x-api-key"]) {
    res.status(401).send({
      message: "You are not authorized to view this content",
    });
    return;
  }
  const user = await User.findOne({ apiKey: req.headers["x-api-key"] });
  if(!user) {
    res.status(401).send({
        message: "You are not authorized to view this content ( No user with this key ) "
    })
    return;
  }
  if (user.usage > user.limit-1) {
    res.status(403).send({
      message: "Your limit has been exhausted !",
    });
    return;
  }
  user.increment_usage();
  await user.save();
  res.status(200).send({
      status: 'Success'
  });
});


//-------------------------------------------------------------------------  
app.listen(process.env.PORT, () => {
  console.log(`port is running on port ${process.env.PORT}`);
});
//-------------------------------------------------------------------------  
