import Joi from 'joi'; 

const schemas = { 
  user: Joi.object().keys({ 
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    age: Joi.string().required(),
    address: Joi.string().required()
  }) ,
  userSignin: Joi.object().keys({ 
    email: Joi.string().required(),
    password: Joi.string().required()
  })  
  // future schemas will be defined here below ...
};

export default schemas;