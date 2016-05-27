import mongoose from 'mongoose';

export default {
  connect: () => mongoose.connect('mongodb://localhost:27017/wonky'),
};
