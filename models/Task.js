const mongoose = require('mongoose');
const collection = 'tasks'

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  userId: Object,
  createdAt: { type: Number, default: Date.now },
  updatedAt: Number
}, { collection })

module.exports = mongoose.model('Task', TaskSchema);