const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../model/userModal");
const Token = require("../model/tokenModal");

dotenv.config();

exports.signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const createUser = {
      name: request.body.name,
      username: request.body.username,
      password: hashedPassword,
    };
    const newUser = new User(createUser);
    await newUser.save();
    return response.status(200).json({ msg: "User Created Successfully!..." });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ msg: "An Error Occurred while creating a user" });
  }
};

exports.loginUser = async (request, response) => {
  const user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }
  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15d" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
        });
    } else {
      response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};

exports.logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};
