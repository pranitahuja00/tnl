const express = require('express');
const app = express();
const path=require('path');
const mongoose = require('mongoose');
const register=require('./models/user')

mongoose.connect('mongodb://localhost:27017/tnl', {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("Connection successful");
}).catch((e)=>{
    console.log("Connection failed");
});
const con = mongoose.connection;
app.use(express.json());
app.use(express.static('../client/public'));
app.use(express.urlencoded({extended:false}));

app.get('/register', async(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/register.html'));
});
app.get('/', async(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/login.html'));
});
/* app.get('/index', async(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
}); */
app.get('/about', async(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/about.html'));
});
app.get('/contact', async(req, res)=>{
    res.sendFile(path.join(__dirname, '../client/public/contact.html'));
});
app.post('/register', async(req, res)=>{
    const user = new register({id:Date.now(),fname: req.body.Name, lname: req.body.LastName, email:req.body.Email, password:req.body.Password, month:req.body.birthday_month, day: req.body.birthday_day, year:req.body.birthday_year, gender:req.body.radiobutton});
    await user.save();
    console.log(req.body);
    res.sendFile(path.join(__dirname, '../client/public/login.html'));
   
});
app.post('/login', async(req, res)=>{
    try{
        const email = req.body.Email;
        const password = req.body.Password;
        const user = await register.findOne({email:email});
        if(user.password === password){
            res.status(201).sendFile(path.join(__dirname, '../client/public/index.html'))
        }
        else{
            res.send("Invalid Password");
        }
    }
    catch(error){
        res.status(400).send("Invalid email");
    }
});

/* app.post('/clicked', (req, res) => {
    const click = JSON.parse(req.body);
    console.log(click);
  }); */
app.listen(process.env.PORT || 4300);
