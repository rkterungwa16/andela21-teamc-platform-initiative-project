import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import mongoose from 'mongoose';
import mongooseRole from 'mongoose-role';
import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import myApp from './API/src/vote';
const app = express();

// Connect to database
mongoose.connect('mongodb://crowdsource:terunkom1986@ds143221.mlab.com:43221/crowdsource');

dotenv.config({ path: '.env.example' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "Anywhere I go",
    resave: false,
    saveUninitialized: false
}));

app.listen(process.env.PORT_DEV, () => {
  console.log('Server listening on ' + process.env.PORT_DEV);
});

// create user model 
let userSchema = new mongoose.Schema({
  username: String,
  email: String,
  image: String,
  bio: String
});

// userSchema.plugin(mongooseRole,{ 
//   roles: ['user', 'admin'],
//   accessLevels: {
//     'user': ['user', 'admin'],
//     'admin': ['admin']
//   }
// });
let User = mongoose.model('User', userSchema);

let userData = { 
  username: 'terunkom',
  password: '19111986',
  image: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg', //default image
  bio: 'Im new to NodeBook!',
  hidden: false,
  wall: []
};

// let userData = { 
//   username: 'terunkom',
//   password: '19111986',
//   image: 'http://leadersinheels.com/wp-content/uploads/facebook-default.jpg', //default image
//   bio: 'Im new to NodeBook!',
//   hidden: false,
//   wall: [],
//   role: 'user'
// };
let myUser = new User(userData);

// let hasAccess = (accessLevel) => {
//   return (req, res, next) => {
//     if (req.session.user && req.session.user.hasAccess(accessLevel)) {
//       return next();
//     }
//     return res.json({
//       success: false,
//       error: 'Unauthorized'
//     });
//   }
// }

//console.log(myUser.hasAccess('admin'));
let newUser = new User(userData).save(function (err){
  console.log('New user '+ userData.username + ' has been created!');
});

app.get('/upvote', (req, res) => {
  if (req.session.user) {
    const id = parseInt(req.query.id);
    const query = { id: id };
    const username = req.session.user.username;

    User.findOne(query, (err, user) => {
      const myVote = new myApp(user);
      myVote.upvote(username);
      res.json(user);
    })
  }
})
module.exports = app;