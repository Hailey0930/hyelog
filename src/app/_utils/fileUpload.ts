import { put } from "@vercel/blob";

export const fileUpload = async (image: File | null) => {
  if (!image) return null;

  const blob = await put(image.name, image, {
    access: "public",
    contentType: "multipart/form-data",
  });
  return blob.url;
};
