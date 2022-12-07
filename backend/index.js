const express = require('express')
const mongoose = require('mongoose')
const Note = require('./models/Note')
const User = require('./models/User')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000
mongoose.connect('mongodb://localhost:27017/NotesApp');
//endpoints to server the HTML
app.get('/', (req, res) => {
  res.sendFile("pages/index.html",{root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile("pages/login.html",{root: __dirname})
  })

app.get('/signup', (req, res) => {
    res.sendFile("pages/signup.html",{root: __dirname})
  })
 //endpoints for APIs
app.post('/getnotes',async (req, res) => {
  let notes = await Note.find({email: req.body.email})
    res.status(200).json({success:true, notes})
})
app.post('/login', async(req, res) => {
    let user = await User.findOne(req.body)
    console.log(user)
   if(!user){
    res.status(200).json({success: false,message: "Nouesr found"})
   }
   else{
    res.status(200).json({success: true, message: "uesr found"})
   }
   
})
app.post('/signup', async(req, res) => {
    const {userToken} = req.body
    let user = await User.create(req.body)
    res.status(200).json({success:true, user: user})
})
app.post('/addnote', async(req, res) => {
    const {userToken} = req.body
    let user = await Note.create(req.body)
    res.status(200).json({success:true, note})
})
app.post('/deletenote', (req, res) => {
    const {userToken} = req.body
    res.send("DELETED")
})
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})