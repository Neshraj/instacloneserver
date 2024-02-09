const MongoClient = require('mongodb').MongoClient;

async function Alldataaboutreel(filenames) {



    const { MongoClient, GridFSBucket } = require('mongodb');
    const { Readable } = require('stream');
  
    const url = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'reels';
    const client = new MongoClient(url);
  
    try {
      await client.connect();
      
      console.log('Connected to the database');
  
      const db = client.db(dbName);

      const collection = db.collection('videos.files');


      let res=collection.find({});

      if(res){
        const filteredData = await res.toArray();
        console.log('sent all data');
        return filteredData;
      }
      else{
        return 'sorry! there is some problem in fetching user details or check your internet connection and try again';
      }


    } catch (err) {
      return false;
    }
  }
  
  // Usage
  module.exports = Alldataaboutreel;
  
