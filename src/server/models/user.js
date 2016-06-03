import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

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

UserSchema.pre('save', function hashPassword(next) {
  const cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, 5).bind(this)
    .then(hash => {
      this.password = hash;
      next();
    });
});
/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function authenticate(password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
