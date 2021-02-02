const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const LetterSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   font: {
      type: String,
      required: true,
   },
   gradient: {
      type: String,
      required: true,
   },
   content: {
      type: Schema.Types.ObjectId,
      ref: 'contents',
   },
   share_id: {
      type: String,
      default: shortid.generate,
   },
   category: {
      type: String,
      default: 'love',
   },
   writer: {
      type: String,
      default: '',
   },
});

module.exports = Letter = mongoose.model('letters', LetterSchema);
