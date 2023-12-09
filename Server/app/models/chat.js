import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema for Post model

const MessageSchema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    messageBody: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    }
});

const ChatSchema = new Schema({
  studentId: {
    type: String,
    required: true
  },
  consultantId: {
    type: String,
    required: true
  },
  messages: {
    type: [MessageSchema],
    required: true
  }
},
{
    versionKey: false
}
);



const ChatModel = mongoose.model('chat', ChatSchema);

export default ChatModel;