async function Addcommand(data){
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://neshraj:2019109164@cluster0.2ab39qh.mongodb.net/?retryWrites=true&w=majority';
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const database2 = client.db('instaclone');
        const collection2 = database2.collection('users');


        let {semail} = data;
        let {filename} = data;
        let {cdata} = data;
        let {userid} = data;

        const reqdata = await collection2.findOne(
          { semail: semail })
      let {sid} = reqdata;
      let fqp =sid;

      const database = client.db('reels');
      const collection = database.collection('videos.files');
    



            let result = await collection.updateOne(
                { filename: filename },
                { $inc: { 'metadata.numberOfCommands': 1 } } )

    
                const adddata = await collection.findOne(
                    {filename: filename });
                    let {metadata} = adddata;
                    let {commands} = metadata;
                    let ncommands=commands+','+cdata+'|'+fqp;
    
    
                const upresult = await collection.updateOne(
                { filename: filename },
                { $set: { 'metadata.commands': ncommands } })


                //To update notifications


              const notdata = await collection2.findOne(
                { sid: userid });
                let {snotifications} = notdata;
                let nsnotifications=snotifications+','+fqp+'cmt';
                
                const nr = await collection2.updateOne(
                { sid: userid },
                { $set: { snotifications: nsnotifications } })


      } catch (error) {
        console.log(error);
        return ('sorry! there is some problem in fetching user details or check your internet connection and try again');
      } finally {
        await client.close();
      }
    }

  module.exports = Addcommand;