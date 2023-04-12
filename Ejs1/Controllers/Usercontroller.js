const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const ITEM_PRE_PAGE = 5;

exports.userslogin = async (req, res) => {
  const message = req.flash("message");
  const error = req.flash("error");
  res.render("login", { messages: message, Error: error });
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const isvalid = await bcryptjs.compare(req.body.password, user.password);

    if (!isvalid) {
      const error = new Error("Invalid Email or Password");
      error.statusCode = 404;
      throw error;
    }

    // const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    // res.cookie("jwt", token);

    req.session.userId = user._id;

    req.flash("message", "User Login Successfully Done....");

    res.redirect("/index");
  } catch (error) {
    res.render("error401");
    // res.json({ message: "Invalid Email Or password" });
  }
};

exports.Registection = async (req, res) => {
  const error = req.flash("messages");
  res.render("register", { Error: error });
};

exports.registection = async (req, res) => {
  // let email = req.body.email
  const files = req.file;
  try {
    const user = new User({
      fristName: req.body.fristName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      image: req.file.filename,
    });

    await user.save();

    // const users = await User.findOne({ email: email });

    // if (users) {
    //   if (users._id.toString() !== this._id.toString()) {
    //     const error = new Error("User already registered this email..");
    //     error.statusCode = 401;
    //     throw error;
    //   }
    // }

    req.flash("message", "successfully Registered.");

    res.redirect("/login");
  } catch (error) {
    // res.json({ message: error });
  }
};

exports.index = async (req, res) => {
  const page = +req.query.page || 1;
  let totalItems;

  const users = await User.find()
    .countDocuments()
    .then((numUsers) => {
      totalItems = numUsers;
      return User.find()
        .skip((page - 1) * ITEM_PRE_PAGE)
        .limit(ITEM_PRE_PAGE)
    });

  const message = req.flash("message");
  const messagedel = req.flash("messageDel");

  res.render("index", {
    user: users,
    pageTitle: "user data",
    path: "/",
    currentPage: page,
    hasNextPage: ITEM_PRE_PAGE * page < totalItems,
    hasPreviousPaage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(totalItems / ITEM_PRE_PAGE),
    users,
    messages: message,
    messagesDel: messagedel,
  });

  // res.render("index", { users, messages: message, messagesDel: messagedel });
  req.flash("message", "User Lgout..");
};

exports.ViewUsers = async (req, res) => {
  const user = await User.find();

  user.map((user) => {
    return {
      fristName: user.fristName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      image: user.image,
    };
  });
};

// exports.getPagintion = async(req,res,next)=>{
//   var prePage = 9
//   var perPage = req.params.page || 1

//   User.find({}).skip((perPage * perPage)-perPage).limit(prePage).exec(function(err,users){
//     User.count().exec(function(err,count){
//       if(err) return next(err)
//       res.render("index",{users: users,current: page,pages: Math.ceil(count,prePage)})

//     })
//   })
// }

// const pagiNation = (page, size) => {
//   const limit = size ? +size : 5;
//   const offset = page ? page * limit : 0;
//   return {
//     limit,
//     offset,
//   };
// };

// exports.getPagintion = async (req, res) => {
//   try {
//     const { page, size } = req.body;

//     const { limit, offset } = pagiNation(page, size);

//     const userResponse = await User.paginate({}, { limit, offset });

//     return res.json({
//       isSuccess: true,
//       data: userResponse,
//       message: "successfully fetched",
//     });
//   } catch (error) {
//     return res.json(error);
//   }
// };

exports.Deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    fs.unlinkSync(path.join(__dirname, `../public/profile/${user.image}`));
    req.flash("messageDel", "User Delete Successfully Done...");

    res.redirect("/index");
  } catch (error) {
    res.json({ Message: error });
  }
};

exports.Update = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });

  req.flash("message", "User Update Successfully Done...");

  res.render("EditUser", { user: user });
};

exports.Edituser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndUpdate(id, {
      fristName: req.body.fristName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });

    fs.unlinkSync(path.join(__dirname, `../public/profile${user.image}`));
    res.redirect("/index");
  } catch (error) {
    res.json({ message: error });
  }
};

exports.LogOut = async (req, res) => {
  const user = req.user;
  // const token = req.token;

  // user.token.filter((ele) => {
  //   return ele.token != token;s
  // });

  // await user.save();

  req.session.destroy();
  res.redirect("/login");
};

{
  /* <div>
<section class="pagination">
    <%=if(currentPage !==1){%>
        <li class="page-item"><a href="/?page=1" class="pagemanage page-link">1</a></li>
        <%}%>
            <%= if(hasPreviousPage){%>
                <li class="page-item"><a href="/?page<%=previousPage%>"<%= previousPage %> class="pagemanage page-link"></a></li>
                <%}%>

                <li class="page-item"><a href="/?page<%= currentPage%>" class="action"><%=currentPage%></a></li>




</section>
</div> */
}
