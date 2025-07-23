import mongoose from 'mongoose';

const uri = 'mongodb+srv://shivateja:7758015455Ab@cluster0.d4qlwnw.mongodb.net/panoramaed?retryWrites=true&w=majority&appName=Cluster0';

async function cleanupDuplicateStudents() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const students = await db.collection('students').find({}).toArray();
  const seen = new Map();
  const toDelete = [];
  for (const student of students) {
    if (seen.has(student.email)) {
      toDelete.push(student._id);
    } else {
      seen.set(student.email, student._id);
    }
  }
  if (toDelete.length > 0) {
    await db.collection('students').deleteMany({ _id: { $in: toDelete } });
    console.log(`Deleted ${toDelete.length} duplicate student(s).`);
  } else {
    console.log('No duplicate students found.');
  }
  await mongoose.disconnect();
  console.log('Duplicate student cleanup complete!');
}

cleanupDuplicateStudents().catch(err => {
  console.error('Error during duplicate student cleanup:', err);
  process.exit(1);
}); 