import User from "../models/User";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";


const generateAuthToken = (newUserDetails) => {
    const token = jwt.sign(newUserDetails, config.get('jwtPrivateKey'));
    return token;
}

const userController = {};

userController.postSignup = async (req, res) => {

    let user = await User.findAll({
        where: {
            email: req.body.email,
        }
      });
    if (user.length != 0) return res.status(400).send({ error: "Email is already registered by another user"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUserDetails = { 
        name: req.body.name,
        email : req.body.email,
        password: hashedPassword,
        age: req.body.age,
        address: req.body.address
    };
    const result = await User.create(newUserDetails);
    const token = generateAuthToken(newUserDetails);
    // res.header('user-id',user._id);
    // res.header('Access-Control-Expose-Headers','user-id');
    res.send({
      "x-auth-token": token,
      "user-details": result
    });
};

userController.getAll = async (req, res) => {

    try{
      const users = await User.findAll()
      res.send(users);
    }
    catch(err){
      res.status(404);
      res.send({ error: err });
    }
  
}
  


export default userController;