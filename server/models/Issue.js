const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["open", "pending", "completed"],
    default: "open"
  },
  owner: {
    type: String,
    required: true
  },
  actions: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      title: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Issue", IssueSchema);
