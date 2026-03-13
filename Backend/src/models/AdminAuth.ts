import mongoose, { Schema, Document } from "mongoose";

export interface IAdminAuth extends Document {
  email: string;
  googleId?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const adminAuthSchema = new Schema<IAdminAuth>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const AdminAuth = mongoose.model<IAdminAuth>(
  "AdminAuth",
  adminAuthSchema,
);

// OTP Session
export interface IOTPSession extends Document {
  email: string;
  otp: string;
  attempts: number;
  expiresAt: Date;
  createdAt: Date;
}

const otpSessionSchema = new Schema<IOTPSession>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Auto-delete expired records
    },
  },
  {
    timestamps: true,
  },
);

export const OTPSession = mongoose.model<IOTPSession>(
  "OTPSession",
  otpSessionSchema,
);

// Admin Session
export interface IAdminSession extends Document {
  adminId: mongoose.Types.ObjectId;
  token: string;
  ipAddress: string;
  userAgent: string;
  expiresAt: Date;
  createdAt: Date;
}

const adminSessionSchema = new Schema<IAdminSession>(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "AdminAuth",
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    ipAddress: String,
    userAgent: String,
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

export const AdminSession = mongoose.model<IAdminSession>(
  "AdminSession",
  adminSessionSchema,
);
