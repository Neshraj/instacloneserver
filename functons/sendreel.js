async function Sendreel(data){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();



        const database2 = client.db('instaclone');
        const collection2 = database2.collection('users');

        const database = client.db('reels');
        const collection = database.collection('videos.files');


        let {semail} = data;
        let {reelfullpath} = data;
        let {userid} = data;
        let {touid} = data;

        const reqdata = await collection2.findOne(
          { semail: semail })
      let {sid} = reqdata;
      let fqp =sid;

      let result = await collection.updateOne(
        { 'metadata.userId': userid },
        { $inc: { 'metadata.numberOfShares': 1 } } )


                const notdata = await collection2.findOne(
                { sid: touid });
                let {snotifications} = notdata;
                let nsnotifications=snotifications+','+fqp+'|'+reelfullpath+'|'+userid+'sntrl';

                const nr = await collection2.updateOne(
                { sid: touid },
                { $set: { snotifications: nsnotifications } })




      } catch (error) {
        console.log(error);
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = Sendreel;