const LocalStrategy = require("passport-local").Strategy;
const USER = require("../models/User");
const bcryptjs = require("bcryptjs");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user._id);
    }
    return done(null, false);
  });

  passport.deserializeUser((id, done) => {
    try {
      const user = USER.findById({ _id: id });
      delete user.password;
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (username, password, done) {
        const user = await USER.findOne({ email: username });

        if (!user) {
          return done(null, false, {
            type: "error",
            message: "User Not Found!!",
          });
        }

        const isvalid = await bcryptjs.compare(password, user.password);

        if (!isvalid) {
          return done(null, false, {
            type: "error",
            message: "Email Or Password Incorrect!!",
          });
        }
        return done(null, user, {
          type: "message",
          message: "User Login Successfully Done....",
        });
      }
    )
  );
};

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "passwd",
//       passReqToCallback: true,
//       session: false,
//     },
//     async function (username, password, done) {
//       USER.findOne({ email: username, password }, function (err, user) {
//         if (err) {
//           done(err);
//         }
//         if (!user) {
//           done(null, false, {
//             type: "error",
//             message: "incorrect username",
//           });
//         }
//         if (user.password !== password) {
//           done(null, false, {
//             type: "error",
//             message: "incorrect password",
//           });
//         }
//         return done(null, user);
//       });
//     }
//   )
// );
