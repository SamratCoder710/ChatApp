const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userNamePresent = await User.findOne({ username });
    if (userNamePresent) {
      return res.json({
        msg: "Register failed",
        reason: "UserName already exist..",
        status: false,
      });
    }
    const emailPresent = await User.findOne({ email });
    if (emailPresent) {
      return res.json({
        msg: "Register failed",
        reason: "Email already exist..",
        status: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    const userObj = user.toObject();
    delete userObj.password;
    return res.json({ status: true, user:userObj });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const passwordCorrect = await bcrypt.compare(
        password,
        user.password
      );
      if (passwordCorrect) {
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.email;
        return res.json({ status: true, user: userObj });
      } else {
        return res.json({ status: false, reason: "Incorrect Password" });
      }
    }
    return res.json({ status: false, reason: "User not found" });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { image } = req.body;
    const user = await User.findOne({ _id: id }).select([
      "avatarImage","isAvatarImageSet","username","_id"
    ]);
    user.isAvatarImageSet = true;
    user.avatarImage = image;
    await user.save();
    res.json({ isSet: true, image, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async(req,res,next)=>{
  try{
    const {id} = req.params;
    const allUsers = await User.find({_id:{ $ne: id }}).select([
      "username","avatarImage"
    ]);
    res.json({status:true,users:allUsers});
  }catch(ex){
    next(ex);
  }
}