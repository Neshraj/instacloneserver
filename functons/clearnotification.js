
async function Clearnotifications(data){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('instaclone');
        const collection = database.collection('users');
    
        // Check if the email exists in the database
        let {semail} = data;

          //Updating notificationdata

          const nr = await collection.updateOne(
            { semail: semail },
            { $set: { snotifications: '' } })
        //let arrnd = snotifications.split(',');
        //snotifications = arrnd.slice(1);
        return 'ok';
    } catch (error) {
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }
  
    module.exports = Clearnotifications;