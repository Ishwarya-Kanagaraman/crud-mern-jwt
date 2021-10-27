const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User=require("../model/user");

//register

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const Olduser = await User.findOne({ email });
    if (Olduser) {
      return res.status(409).send("user already exists with that mail");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: passwordHash,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "40d",
      }
    );
    user.token = token;
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err.message);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json("Provide all the input fields");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json("User not found.Kindly register");
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "40d",
        }
      );

      user.token = token;
      console.log("user token is", token);
      await user.save();

      res.status(200).json({user,token});
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

module.exports=router;