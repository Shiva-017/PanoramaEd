import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema for User model

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    }
},
{
    versionKey: false
}
);

const UserModel = mongoose.model('user', UserSchema);

export default UserModel;