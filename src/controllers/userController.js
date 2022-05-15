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
    res.header('user-id',result.id);
    res.header('Access-Control-Expose-Headers','user-id');
    res.send({
      "x-auth-token": token
    });
}

userController.post = async (req, res) => {

  let user = await User.findOne({
    where: {
        email: req.body.email,
    }
  });
  if (!user) return res.status(400).send({ error: 'Invalid password or Email.'});


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ error: 'Invalid Passw0rd or email.'});
  }

  const token = generateAuthToken(user.dataValues);
  res.header('user-id',user.dataValues.id);
  res.header('Access-Control-Expose-Headers','user-id');
  res.send({
    "x-auth-token": token
  });
};

userController.patch = async (req, res) => {
  if(!(req.user.id == req.params.id || req.user.email == "smbonimpa2011@gmail.com" )){
    return res.status(401).send({error:'Unauthorized action.'});
  }
  try{

    if(req.body.age){
      User.update({
        age: req.body.age
      }, {
        where: {
          id: req.params.id
        }
      })
    }
    if(req.body.name){
      User.update({
        name: req.body.name
      }, {
        where: {
          id: req.params.id
        }
      })
    }
    if(req.body.email){
      User.update({
        email: req.body.email
      }, {
        where: {
          id: req.params.id
        }
      })
    }
    if(req.body.address){
      User.update({
        address: req.body.address
      }, {
        where: {
          id: req.params.id
        }
      })
    }
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      User.update({
        password: hashedPassword
      }, {
        where: {
          id: req.params.id
        }
      })
    }
    
    res.header('user-id',req.user.id);
    res.header('Access-Control-Expose-Headers','user-id');
    res.status(201);

    
    let user = await User.findOne({
      where: {
          id: req.user.id,
      }
    });

    if(req.user.id == req.params.id){
      const token = generateAuthToken(user.dataValues);
      return res.send({
        "x-auth-token": token
      });
    }

    return res.send({
      id: user.id,
      name: user.name,
      email: user.email, 
      age: user.age,
      address: user.address
    });
  }
  catch{
    res.status(404);
    res.send({ error: "Can't find the user!" });
  }

};

userController.delete = async (req, res) => {
  if(!(req.user.id == req.params.id || req.user.email == "smbonimpa2011@gmail.com" )){
    return res.status(401).send({error:'Unauthorized action.'});
  }
  try{
    await User.destroy({
      where: { id: req.params.id },
    });
    
    res.status(204).send();
  }
  catch{
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }

};

userController.getAll = async (req, res) => {
  if(!(req.user.email == "smbonimpa2011@gmail.com" )){
    return res.status(401).send({error:'Unauthorized action.'});
  }
    try{
      const users = await User.findAll()
      res.send(users);
    }
    catch(err){
      res.status(404);
      res.send({ error: err });
    }
  
}

userController.getOne = async (req, res) => {
  
  try{
    let user = await User.findOne({
      where: {
          id: req.params.id,
      }
    });
    res.send({
      id: user.id,
      name: user.name,
      email: user.email, 
      age: user.age,
      address: user.address
    });
  }
  catch{
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }

}
  


export default userController;