async function Checkmyfollowing(data){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('instaclone');
        const collection = database.collection('users');
    
        // Check if the email exists in the database
        let {semail} = data;
        const alldata = await collection.findOne({ semail });
    
        if (alldata) {
          // Update the password for the matched email
            let {sfollowersdata} = alldata;
          return sfollowersdata;
        } else {
          console.log('something went wrong');
          return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
        }
      } catch (error) {
        console.log('prob');
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = Checkmyfollowing;