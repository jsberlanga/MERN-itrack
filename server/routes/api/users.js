const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    // Name is required
    check("name", "Please enter your name")
      .not()
      .isEmpty(),
    // Email must be an email
    check("email", "Please enter a valid email").isEmail(),
    // Password must be at least 4 chars long
    check("password", "Please enter a password at least 4 chars long").isLength(
      { min: 4 }
    )
  ],

  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: `Oops! This user already exists.` }]
        });
      }

      user = new User({
        name,
        email,
        password
      });

      user.password = await bcrypt.hash(password, 10);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 24 * 60 * 60 },
        (err, token) => {
          if (err) throw new err();
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
