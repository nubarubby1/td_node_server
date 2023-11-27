
import * as dao from "./dao.js";
import bcrypt from "bcrypt";


let currentUser = null;

import jwt from 'jsonwebtoken';

function UserRoutes(app) {

// helpers for password
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};



const signup = async (req, res) => {
  console.log("HIT SIGNUP");
  try {
    // validation
    const { username, email, password } = req.body;
    if (!username) {
      return res.json({
        error: "userName is required",
      });
    }
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be 6 characters long",
      });
    }
    const exist = await dao.findUserByEmail(email);
    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

  


    const hashedPassword = await hashPassword(password);

    try {
   
      

      
      currentUser = await dao.createUser({username, email, password: hashedPassword});
      res.json(currentUser);

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      //   console.log(user);
      const { password, ...rest } = user._doc;
      return res.json({
        token,
        user: rest,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

const signin = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await dao.findUserByEmail(email);
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    // check password
  

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    user.secret = undefined;

    console.log("signin success");
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};


// routes

app.post("/signup", signup);
app.post("/signin", signin);


}

export default UserRoutes;