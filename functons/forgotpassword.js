async function forgotpassword(data){
    delete data.sotp;
    const { MongoClient } = require('mongodb');

    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('instaclone');
        const collection = database.collection('users');
    
        // Check if the email exists in the database
        let {semail} = data;
        let {cpassword} = data;
        const existingUser = await collection.findOne({ semail });
    
        if (existingUser) {
          // Update the password for the matched email
          await collection.updateOne({ semail }, { $set: { spassword: cpassword } });
    
          return ('Password updated successfully');
        } else {
          return ('Account not found with this email id');
        }
      } catch (error) {
        return ('There is some problem in updating password or check your internet connection and try again');
      } finally {
        await client.close();
      }

}
      //console.log('data in create function ',data);
      
  
  
  module.exports = forgotpassword;