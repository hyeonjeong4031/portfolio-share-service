import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    commentedID: {
        type: String,
        required: true,
      },
    writer_id: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };
