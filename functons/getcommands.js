async function Getcommands(data){
    console.log('in function');
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();
    
        const database = client.db('reels');
        const collection = database.collection('videos.files');
    
        // Check if the email exists in the database

        let {filename} = data;
        console.log('file name is ',filename);

                const adddata = await collection.findOne(
                    {filename: filename });
                    let {metadata} = adddata;
                    let {commands} = metadata;

                if(commands){
                    return commands;
                }
    

      } catch (error) {
        console.log(error);
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = Getcommands;