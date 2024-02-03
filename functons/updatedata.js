async function Updatedata(data){
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
        let {spassword} = data;
        let {sname} = data;
        const filter = { semail: semail };
        const update = {
            $set: {
              spassword: spassword,
              sname: sname
            }
          };
        const result = await collection.updateOne(filter, update);
        if (result.modifiedCount === 1) {
            return ('User data updated successfully');
        } else {
            return ('No changes made');
        }
    

      } catch (error) {
        return ('There is some problem in updating data or check your internet connection and try again');
      } finally {
        await client.close();
      }

}

  module.exports = Updatedata;