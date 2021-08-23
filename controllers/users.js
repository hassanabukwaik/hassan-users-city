const User = require("../model/User");


//////
const hendleErrors = (err) =>{
  console.log(err.message,err.code);
  let errors = {
    name:'',
    email:'',
    age:'',
    skills:''
  
  };
  if(err.code === 11000){
    errors.email = 'that email already registered';
    return errors;
  }


//
  if(err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;

}


exports.createUser = async (req, res, next) => {
  const {
    name,email,age,skills

  } = req.body;

  try {
    const User = await User.create({
      name,
      email,
      age,
      skills,
    });

    res.status(201).json(User);
  } catch (err) {
    const errors = hendleErrors(err);

    res.status(500).json({errors});
  }
};

exports.editUser = async (req, res, next) => {
  const {
    body: { userId, newData },
  } = req;

  try {
    await User.findByIdAndUpdate(userId, newData);
    res.status(200).send({
      msg: "user updated successfully",
    });
  } catch (err) {
    res.status(500).send({
      msg: "server error",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;
  try {
    await User.findByIdAndRemove(userId);
    res.status(200).send({
      msg: "user deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      msg: "server error",
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const{page = 1 ,limit = 10} = req.query;
    const users = await User
    //.find({$and : [{email: "ali@gmail.com"},{skills:"java"}]})
    .find({age:{$eq : 10}})
    //.select({name:1,age:1})
    .populate("city")
    .limit(limit * 1)
    .skip((page - 1) * limit);
    res.status(200).send({
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).send({
      msg: "server error",
    });
  }
};
