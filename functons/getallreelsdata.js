const allusers = require('./allusers');

async function Getallreelsdata(){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('reels');
        const collection = database.collection('allreelsdata');

        // Check if the email exists in the database
        let _id = 'reels';

        let alldata = await collection.findOne({ _id });
    
        if (alldata) {
            let {allreelsdata} = alldata;
          // Update the password for the matched email
          return (allreelsdata);
        } else {
          return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
        }
      } catch (error) {
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = Getallreelsdata;