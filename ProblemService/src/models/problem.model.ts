import mongoose, { Document } from "mongoose";


export interface ITestcase {
  input: string;
  output: string;
}

export interface IProblem extends Document {
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  createdAt: Date;
  updatedAt: Date;
  editorial?: string;
  testcases: ITestcase[];
}

const testSchema = new mongoose.Schema<ITestcase>({
  input: {
    type: String,
    required: [true, "Input is required"],
    trim: true,
  },
  output: {
    type: String,
    required: [true, "Output is required"],
    trim: true,
  }
})

const problemSchema = new mongoose.Schema<IProblem> ({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    trim: true,
    maxLength: [100, "Title can not be more than 100 characters"]
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  difficulty: {
    type: String,
    enum: {
      values: ["Easy", "Medium", "Hard"],
      message: "{VALUE} is not supported"
    },
    default: "Easy",
    required: [true, "Difficulty level is required"]
  },
  editorial: {
    type: String,
    trim: true,
  },
  testcases: [testSchema]
}, {
  timestamps: true,
  toJSON: {
    transform(_, record) {
      delete (record as any).__v;
      record.id = record._id;
      delete record._id;
      return record;
    }
  }
})

problemSchema.index({ title: 1 }, { unique: true });
problemSchema.index({ difficulty: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);