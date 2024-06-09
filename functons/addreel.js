 async function Addreel(videoBuffer,filename,userid,videoDuration) {
    const { MongoClient, GridFSBucket } = require('mongodb');
    const { Readable } = require('stream');
    console.log('inside add reel');
  
    const url = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'reels';
    const videoFilename = filename;
    let userId = userid;
    let numberOfLikes = 0;
    let numberOfcommands = 0;
    let commands = '';
    let likesdata = '';
    let numberOfshares = 0;
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      console.log('Connected to the database');
  
      const db = client.db(dbName);
      const bucket = new GridFSBucket(db, { bucketName: 'videos' });
  
      // Create a write stream to store the video in MongoDB
      const metadata = {
        userId: userId,
        numberOfLikes: numberOfLikes,
        numberOfCommands: numberOfcommands,
        commands: commands,
        likesdata: likesdata,
        numberOfShares: numberOfshares,
        videoDuration,

      };
      
      const uploadStream = bucket.openUploadStream(videoFilename, { metadata: metadata });
      
  
      // Pipe the video buffer to the MongoDB stream
      const readableStream = new Readable();
      readableStream.push(videoBuffer);
      readableStream.push(null); // Signals the end of the stream
  
      readableStream.pipe(uploadStream);

      // Wait for the upload to finish
      
      const database = client.db('instaclone');
      const collection = database.collection('users');
      
      const result = await collection.updateOne(
        { sid: userid },
        { $inc: { sposts: 1 } } )

        const adddata = await collection.findOne(
        { sid: userid });
        let {spostsdata} = adddata;
        let nspostsdata=spostsdata+','+filename;


        const upresult = await collection.updateOne(
            { sid: userid },
            { $set: { spostsdata: nspostsdata } })



      //for reels update

      const database2 = client.db('reels');
      const collection2 = database2.collection('allreelsdata');

      const result2 = await collection2.updateOne(
        { _id: 'reels' },
        { $inc: { tnfreels: 1 } } )

        const adddata2 = await collection2.findOne(
        { _id: 'reels' });
        let {allreelsdata} = adddata2;
        let nallreelsdata =allreelsdata+','+filename+'|'+userid;


        const upresult2 = await collection2.updateOne(
            { _id: 'reels' },
            { $set: { allreelsdata: nallreelsdata } })

      
      await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      await client.close();
    }
  }
  
  // Usage
  module.exports = Addreel;
  