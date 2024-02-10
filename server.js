const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const nodemailer = require('nodemailer');
const createaccount = require('./functons/createaccount.js');
const forgotpassword = require('./functons/forgotpassword.js');
const allusers = require('./functons/allusers.js');
const login = require('./functons/login.js');
const getuserdetails = require('./functons/getuserdetails.js');
const addfollowers = require('./functons/addfollowers.js');
const checkfollowing = require('./functons/checkfollowing.js');
const removefollowers = require('./functons/removefollowers.js');
const updatedata = require('./functons/updatedata.js');
const checkmyfollowing = require('./functons/checkmyfollowing');
const notification = require('./functons/notification.js');
const clearnotification = require('./functons/clearnotification.js');
const addreel = require('./functons/addreel.js');
const getallreelsdata = require('./functons/getallreelsdata.js')
const alldataaboutreel = require('./functons/alldataaboutreel.js')
const addremovelikes = require('./functons/addremovelikes.js')
const addcommand = require('./functons/addcommand.js')
const getcommands = require('./functons/getcommands.js')
const sendreel = require('./functons/sendreel.js');
const multer = require('multer');
const upload = multer();



//For getreel
const { MongoClient, GridFSBucket } = require('mongodb');
const url = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'reels';
const videoFilename ='myreel1.mp4';


//For get reel




app.use(express.json());
app.use(cors());

//OTP
let motp=0;
//Server functions

function generateOTP() {
  motp = Math.floor(1000 + Math.random() * 9000);
  return motp;  
}

function sendOtpToEmail(email,otp){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'instaclonemail@gmail.com',
      pass: 'pgbg vmey gwaz yjvf'
    }
  });

  var mailOptions = {
    from: 'instaclonemail@gmail.com',
    to: email,
    subject: 'OTP to create account in instaclone',
    html: '<div style="display: flex; flex-direction: column;  align-items: center; background-image: linear-gradient(to bottom right, rgb(97,74,185),rgb(216,49,108)); background-image: linear-gradient(to bottom left, rgb(162,51,171),rgb(244,159,68)); box-shadow: 1px 1px 2px 1px #000; border-radius: 15px; height: 400px;"><div><h2 style="text-align: center; font-family: Courier New, Courier, monospace; color: rgb(0, 0, 0); margin: 100px 50px;">Your OTP to create account in instaclone is '+otp+'. Dont share with anyone. You can change the password later</h2></div></div>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
    }
  });
}

//function to evalvate otp

function checkOTP(sotp){
  if(sotp==motp){
    return true;
  }
  else{
    return false;
  }
}


//functionds ends hear

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });


app.get('/', (req, res) => {
  res.json({ message: 'ok!' });
});

//Data listenning starts hear



//To send otp
app.post('/sendotp',(req,res)=>{
  const receivedData = req.body;
  //console.log('Recived email for otp is : ',receivedData);
  let {semail} = receivedData;
  sendOtpToEmail(semail,generateOTP());
  res.json({ message: 'OTP sent to your email successfully'+motp});
})


//To create account
app.post('/createaccount', (req, res) => {
  async function create(){
    const receivedData = req.body;
    let {sotp} = receivedData;
    //console.log('Received data:', receivedData);
    let otpVerification=checkOTP(sotp);
    if(otpVerification){
      motp=0;
      let crres = await createaccount(receivedData);
      if(crres){
        res.json({ message: crres});
      }
    }
    else{
      res.json({ message:'Invalid otp enter the correct otp'});
    }
  }
  create();
});


//To forgot password

app.post('/forgotpassword', (req, res) => {
  async function create(){
    const receivedData = req.body;
    let {sotp} = receivedData;
    //console.log('Received data:', receivedData);
    let otpVerification=checkOTP(sotp);
    if(otpVerification){
      motp=0;
      let crres = await forgotpassword(receivedData);
      if(crres){
        res.json({ message: crres});
      }
    }
    else{
      res.json({ message:'Invalid otp enter the correct otp'});
    }
  }
  create();
});


//To update details
app.post('/updatedata', (req, res) => {
  async function update(){
    const receivedData = req.body;
    let crres = await updatedata(receivedData);
    res.json({ message: crres});
  }
  update();
});






//To list all users
app.get('/allusers', async (req, res) => {
  let allusersdata= await allusers()
  //console.log('type',typeof allusersdata);
  res.json({ message: allusersdata});

})

//To add reel

app.post('/addreel', upload.single('video'), async (req, res) => {
  try {
    const videoname = req.body.videoname;
    const userid = req.body.userid;
    const videoBuffer = req.file.buffer;
    const videoDuration = req.file.videoDuration;
    //const filename = req.file.originalname; // Extract the filename

    const result = await addreel(videoBuffer, videoname,userid,videoDuration);

    res.json({ message: result });
  } catch (error) {
    console.error('Error processing video:', error.message);
    res.status(500).json({ message: 'Error processing video.' });
  }
});



//To get all reels data

app.get('/getallreelsdata', async (req, res) => {
  let allusersdata= await getallreelsdata()
  //console.log('type',typeof allusersdata);
  res.json({ message: allusersdata});

})






//To get all detals about the reel
app.post('/alldataaboutreel', (req, res) => {
  async function find(){
    const receivedData = req.body;
    let crres = await alldataaboutreel(receivedData);
    res.json({ message: crres});
  }
  find();
});


//To Add and Remove likes
app.post('/addremovelikes', (req, res) => {
  async function addrmlike(){
    const receivedData = req.body;
    let crres = await addremovelikes(receivedData);
    res.json({ message: crres});
  }
  addrmlike();
});



//To add commands

app.post('/addcommand', (req, res) => {
  async function addcmd(){
    const receivedData = req.body;
    let crres = await addcommand(receivedData);
    res.json({ message: crres});
  }
  addcmd();
});


//To get all commands

app.post('/getcommands', (req, res) => {
  async function getcmd(){
    const receivedData = req.body;
    let crres = await getcommands(receivedData);
    res.json({ message: crres});
  }
  getcmd();
});







//To stream all reels
app.get('/stream-video/:filename', async (req, res) => { 
  const { filename } = req.params;
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'videos' });

    // Use openDownloadStream to create a read stream from MongoDB
    const downloadStream = bucket.openDownloadStreamByName(filename);

    // Set the appropriate headers for video streaming
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Accept-Ranges', 'bytes');

    // Pipe the MongoDB stream to the response stream
    downloadStream.pipe(res);

    // Log errors
    downloadStream.on('error', (err) => {
      console.error('Error streaming video:', err.message);
      res.status(500).end();
    });
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
    res.status(500).end();
  } finally {
    // Close the database connection
    //await client.close();
  }
});













//To get user details
app.post('/getuserdetails', (req, res) => {

   async function getdata(){
     const receivedData = req.body;
     let alldata = await getuserdetails(receivedData)
     res.json({ message: alldata});
   }
  getdata();
});


//To add followers
app.post('/addfollowers', (req, res) => {

   async function getdata(){
     const receivedData = req.body;
     let alldata = await addfollowers(receivedData)
     res.json({ message: alldata});
   }
  getdata();
});

//To add followers
app.post('/removefollowers', (req, res) => {

  async function getdata(){
    const receivedData = req.body;
    let alldata = await removefollowers(receivedData)
    res.json({ message: alldata});
  }
 getdata();
});

//To check following
app.post('/checkfollowing', (req, res) => {

  async function getdata(){
    const receivedData = req.body;
    let alldata = await checkfollowing(receivedData);
    //console.log('type',typeof alldata);
    res.json({ message: alldata});
  }
 getdata();
});

app.post('/checkmyfollowing', (req, res) => {

  async function getdata(){
    const receivedData = req.body;
    let alldata = await checkmyfollowing(receivedData)
    res.json({ message: alldata});
  }
 getdata();
});


//To login

app.post('/login', (req, res) => {
  async function log(){
    const receivedData = req.body;
    //console.log('Received data:', receivedData);
    let logres= await login(receivedData)
    if(logres){
      res.json({ message: true});
    }
    else{
      res.json({ message: 'User not found with this email and password'});
    } 
  }
  log();
});


//To get all notifications
app.post('/notifications', (req, res) => {
  async function getnot(){
    const receivedData = req.body;
    //console.log('Received data:', receivedData);
    let logres= await notification(receivedData)
    if(logres){
      res.json({ message: logres});
    }
    else{
      res.json({ message: 'User not found with this email and password'});
    } 
  }
  getnot();
});


//To send reels 

app.post('/sendreel', (req, res) => {
  async function sendrl(){
    const receivedData = req.body;
    //console.log('Received data:', receivedData);
    let logres= await sendreel(receivedData)
    res.json({ message: logres});

  }
  sendrl();
});





//To clear all notifications
app.post('/clearnotifications', (req, res) => {
  async function clrnot(){
    const receivedData = req.body;
    //console.log('Received data:', receivedData);
    let logres= await clearnotification(receivedData)
    if(logres){
      res.json({ message: logres});
    }
    else{
      res.json({ message: 'User not found with this email and password'});
    } 
  }
  clrnot();
});







app.listen(port, () => {
  console.log(`Server is running at http://:${port}`);
});
