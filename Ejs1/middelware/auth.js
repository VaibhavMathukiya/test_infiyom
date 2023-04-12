// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const bcryptjs = require("bcryptjs");

// const auth = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   let email = req.body.email;
//   let password = req.body.password

//   try {

//     if(email && password){
//       let exitingUser = await User.findOne({email:email},select('password'))
//       if(exitingUser){
//         let match = await bcryptjs.compare(password,exitingUser.password)
//         if(match){
//           req.session.user = exitingUser._id
//           res.redirect("/")
//         }else{
//           res.render("login",{
//             "error": "Invalid Email Or Password",
//             success: false
//           })
//         }
//       }else{
//         res.render("login",{
//           "error": "User with that email dose not exist.",
//           success: false
//         })
//       }
//     }else{
//       res.status(400);
//       res.render("login",{
//         "error": "Please fill in all the fields",
//         success: false
//       })
//     }
//     // const userInfo = await jwt.verify(token, process.env.UKEY);

//     // const user = await User.findOne({ _id: userInfo._id });

//   } catch (error) {
//     res.render("login");
//   }
// };

// module.exports = auth;

function checkisNotAthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/index");
  }
  return next();
}

function checkisAthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
}

module.exports = { checkisNotAthenticated, checkisAthenticated };
