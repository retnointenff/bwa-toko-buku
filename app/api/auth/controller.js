const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signin: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const checkUser = await User.findOne({ where: { email: email } });

      if (checkUser) {
        const checkPassword = bcrypt.compareSync(password, checkUser.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              user: {
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
              },
            },
            "secret"
          );
          res.status(200).json({ message: "Success Sign in", data: token });
        } else {
          res.status(403).json({ message: "Invalid Password" });
        }
      } else {
        res.status(403).json({ message: "Invalid Email" });
      }
    } catch (err) {
      next(err);
    }
  },
  signup: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      const checkEmail = await User.findOne({ where: { email: email } });
      if (checkEmail) {
        return res.status(403).json({
          message: "Email Registered",
        });
      }

      if (password !== confirmPassword) {
        res
          .status(403)
          .json({ message: "Password and Confirm Password doesn't match" });
      }

      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role: role,
      });

      delete user.dataValues.password;
      res.status(201).json({ message: "Success Sign Up", data: user });
    } catch (error) {
      next(error);
    }
  },
};
