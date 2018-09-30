import mongoose from './index';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  time: String
})

export const Task = mongoose.model('Task', taskSchema);