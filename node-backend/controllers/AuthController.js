require("dotenv/config");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");





// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
//     expiresIn: maxAge,
//   });
// };

const maxAge = 1*24*60*60




const handleErrors = (err) => {
    let errors = { email: "", password: ""};
    if (err.message === "Incorrect Email")  
    errors.email = "That email is not registered";
    
    if (err.message === "Incorrect password")  
    errors.password = "That password is incorrect";


    if (err.code === 11000) {
        errors.email = "Email is already registered";
        return errors;
        
    }
    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
    }
    return errors;
  
}




module.exports.register = async(req, res) => {


    try {

      const { email, password } = req.body;
      if ( !email || !password) {
        return res.json({ message: 'Please enter all the details' })
      }

      const userExist = await User.findOne({ email: req.body.email });
      if (userExist) {
          return res.json({ message: 'User already exist with the given email', type: "error"  })
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
      const user = new User(req.body);
      await user.save();
      const theuser = JSON.stringify(user)
      const accessToken = jwt.sign(theuser, process.env.ACCESS_TOKEN)
      res.header('token', accessToken).send({
        token: accessToken,
        user: theuser,
        message: "Successful Registred",
        type: "success"
    })


    }
    catch(err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
  const email = req.body.email
  const password = req.body.password
    // const { email, password } = req.body;
    const user = await User.findOne({ email: req.body.email });

      if (user  == null) {
        res.send({ message: 'Email or password is invalid', type: "error" })
    }else{
        // Check if password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) res.send({ message: 'Email or password is invalid', type: "error" })
        if (validPass) {
            const theuser = JSON.stringify(user)
            const accessToken = jwt.sign(theuser, process.env.ACCESS_TOKEN)
            res.header('token', accessToken).send({
                token: accessToken,
                user: theuser,
                message: "Successful login",
                type: "success"
            })
        }
      }
   
    
  };
  module.exports.login_get = async(req, res) => {
    
  }
  