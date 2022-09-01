import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
