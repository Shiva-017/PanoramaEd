import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  feedId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  upVote: {
    type: Number,
    required: true,
  },
},
{
    versionKey: false
}
);



const PostModel = mongoose.model('post', PostSchema);

export default PostModel;
