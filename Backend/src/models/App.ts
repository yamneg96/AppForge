import mongoose, { Schema, Document } from "mongoose";

export interface IApp extends Document {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  status: "draft" | "released" | "coming_soon" | "archived";
  icon?: string;
  screenshots?: string[];
  techStack?: string[];
  apkUrl?: string;
  ipaUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  version: string;
  rating?: number;
  reviewsCount?: number;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const appSchema = new Schema<IApp>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    longDescription: {
      type: String,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ["draft", "released", "coming_soon", "archived"],
      default: "draft",
    },
    icon: String,
    screenshots: [String],
    techStack: [String],
    apkUrl: String,
    ipaUrl: String,
    playStoreUrl: String,
    appStoreUrl: String,
    githubUrl: String,
    version: {
      type: String,
      default: "1.0.0",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    features: [String],
  },
  {
    timestamps: true,
  },
);

export const App = mongoose.model<IApp>("App", appSchema);
