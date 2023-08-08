const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

categorySchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret.user;
    return ret;
  },
});

categorySchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret.user;
    return ret;
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
