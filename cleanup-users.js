import mongoose from 'mongoose';

const uri = 'mongodb+srv://shivateja:7758015455Ab@cluster0.d4qlwnw.mongodb.net/panoramaed?retryWrites=true&w=majority&appName=Cluster0';

async function cleanupUsers() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  for (const coll of collections) {
    if (coll.name === 'users' || coll.name === 'students') {
      console.log(`Deleting all documents from collection: ${coll.name}`);
      await db.collection(coll.name).deleteMany({});
    }
  }
  await mongoose.disconnect();
  console.log('User cleanup complete!');
}

cleanupUsers().catch(err => {
  console.error('Error during user cleanup:', err);
  process.exit(1);
}); 