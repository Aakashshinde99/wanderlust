const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  authorName: String,
  title: String,
  imageLink: String,
  categories: [String],
  description: String,
  isFeaturedPost: Boolean,
  timeOfPost: { type: Date, default: Date.now },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('Post', postSchema);
