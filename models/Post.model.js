const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema(
  {
    title: {
      type: String,
      require: [true, "Introduce un título"],
    },
    content: {
      type: String,
      require: [true, "Introduce el contenido de tu post"],
    },
    media: {
      type: String,
      require: [true, "Introduce un archivo multimedia"],
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const post = mongoose.model("Post", postSchema);

module.exports = post;