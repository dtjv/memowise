const { getDatabase } = require('../db');
const bcrypt = require('bcrypt');

const db = getDatabase();

const UserSchema = new db.Schema({
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
}, { timestamps: true });

UserSchema.pre('save', function hashPassword(next) {
  bcrypt.genSalt()
    .then((salt) => {
      bcrypt.hash(this.password, salt)
        .then((hash) => {
          this.password = hash;
          next();
        });
    });
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = db.model('User', UserSchema);
