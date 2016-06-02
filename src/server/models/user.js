import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    default: '',
    validate: [
      password => password && password.length > 6,
      'Please make your password longer',
    ],
  },
});

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function authenticate(password) {
  return this.password === password;
};

export default mongoose.model('User', UserSchema);
