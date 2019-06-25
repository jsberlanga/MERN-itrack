const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require("config");

const User = require("../../models/User");

// @route GET api/auth
// @desc Auth
// @access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error.");
  }
});

// @route POST api/auth
// @desc Login user
// @access Public
router.post(
  "/",

  async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: `Email is not found.` }]
        });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

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
