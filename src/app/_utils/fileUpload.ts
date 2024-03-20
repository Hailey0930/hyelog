import { cloudinary } from "@/_lib/cloudinary";

export const fileUpload = async (image: File | null) => {
  if (!image) return null;

  const fileBuffer = await image.arrayBuffer();
  const mimeType = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString("base64");

  const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

  const res = cloudinary.uploader.upload(fileUri, {
    invalidate: true,
    resource_type: "auto",
    filename_override: image.name,
    use_filename: true,
  });

  return res;
};
