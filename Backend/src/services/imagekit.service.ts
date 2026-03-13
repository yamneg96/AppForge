import ImageKit from "imagekit";
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
