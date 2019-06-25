const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Issue = require("../../models/Issue");

// @route POST api/issues
// @desc Add an issue
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("description", "Description is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newIssue = new Issue({
        title: req.body.title,
        description: req.body.title,
        status: req.body.status,
        owner: user.name,
        user: req.user.id
      });

      const create = await newIssue.save();
      res.json(create);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/issues
// @desc Get issues
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/issues/:id
// @desc Get single issue by ID
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ msg: "Issue not found." });
    }

    res.json(issue);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/issues/:id
// @desc Update issue
// @access Private
router.put("/:id", auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ msg: "Issue not found." });
    }

    if (issue.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to do that." });
    }

    issue.title = req.body.title || issue.title;
    issue.description = req.body.description || issue.description;
    issue.status = req.body.status || issue.status;

    const update = await issue.save();
    res.json(update);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/issues/:id
// @desc Delete issue
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ msg: "Issue not found." });
    }

    if (issue.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "You are not authorized to do that." });
    }

    await issue.remove();

    res.json({ msg: "Issue removed from issue tracker." });

    res.json(issue);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/issues/actions/:id
// @desc Define an action
// @access Private
router.post(
  "/actions/:id",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const issue = await Issue.findById(req.params.id);

      const newAction = {
        title: req.body.title
      };

      issue.actions.unshift(newAction);

      await issue.save();

      res.json(issue.actions);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
