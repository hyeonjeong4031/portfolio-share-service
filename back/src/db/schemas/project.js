import { Schema, model } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

autoIncrement.initialize(mongoose.connection);

const ProjectSchema = new Schema(
  {
    projectId: {
      type: Number,
      default: 0,
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = model("Project", ProjectSchema);

ProjectSchema.plugin(autoIncrement.plugin, {
  model: "Project",
  field: "projectId",
  startAt: 1,
  increment: 1,
});

export { ProjectModel };
