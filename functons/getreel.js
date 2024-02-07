// //Working get video function


// app.get('/stream-video', async (req, res) => {
//     const client = new MongoClient(url);
  
//     try {
//       await client.connect();
//       console.log('Connected to the database');
  
//       const db = client.db(dbName);
//       const bucket = new GridFSBucket(db, { bucketName: 'videos' });
  
//       // Use openDownloadStream to create a read stream from MongoDB
//       const downloadStream = bucket.openDownloadStreamByName(videoFilename);
  
//       // Set the appropriate headers for video streaming
//       res.setHeader('Content-Type', 'video/mp4');
//       res.setHeader('Accept-Ranges', 'bytes');
  
//       // Pipe the MongoDB stream to the response stream
//       downloadStream.pipe(res);
  
//       // Log errors
//       downloadStream.on('error', (err) => {
//         console.error('Error streaming video:', err.message);
//         res.status(500).end();
//       });
//     } catch (err) {
//       console.error('Error connecting to the database:', err.message);
//       res.status(500).end();
//     } finally {
//       //await client.close();
//     }
//   });