const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
   content: {
      type: String,
      required: true,
   },
});

module.exports = Content = mongoose.model('contents', ContentSchema);
