import cloudinary from "./cloudinary";

export const uploadImage = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder, // use the folder parameter
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(bytes);
  });
};
