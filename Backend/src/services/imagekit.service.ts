import ImageKit from "imagekit";
import path from "path";
import { config } from "../config/env.js";

const imagekit = new ImageKit({
  publicKey: config.imageKit.publicKey,
  privateKey: config.imageKit.privateKey,
  urlEndpoint: config.imageKit.urlEndpoint,
});

export async function uploadToImageKit(
  file: Buffer,
  fileName: string,
  folder: string = "appforge",
): Promise<any> {
  try {
    const response = await imagekit.upload({
      file: file,
      fileName: fileName,
      folder: folder,
      isPrivateFile: false,
      useUniqueFileName: true,
    });

    return {
      url: response.url,
      fileId: response.fileId,
      name: response.name,
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw new Error("Failed to upload file to ImageKit");
  }
}

function isImageMimeType(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}

function isAppBinaryExtension(ext: string): boolean {
  return ext === ".apk" || ext === ".ipa";
}

export function resolveImageKitFolder(file: Express.Multer.File): string {
  const ext = path.extname(file.originalname).toLowerCase();

  if (isImageMimeType(file.mimetype)) {
    return "appforge/image";
  }

  if (isAppBinaryExtension(ext)) {
    return "appforge/app";
  }

  return "appforge";
}

export async function uploadMulterFileToImageKit(
  file: Express.Multer.File,
): Promise<{ url: string; fileId: string; name: string }> {
  const folder = resolveImageKitFolder(file);
  return uploadToImageKit(file.buffer, file.originalname, folder);
}

export function withImageKitAttachment(url: string): string {
  const hasQuery = url.includes("?");
  const hasAttachment = /(?:\?|&)ik-attachment=/.test(url);

  if (hasAttachment) {
    return url;
  }

  return `${url}${hasQuery ? "&" : "?"}ik-attachment=true`;
}

export async function deleteFromImageKit(fileId: string): Promise<boolean> {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error("ImageKit delete error:", error);
    return false;
  }
}

export default imagekit;
