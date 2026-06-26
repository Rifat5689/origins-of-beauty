const uploadImages = async (files) => {
  if (!files?.length) return null;
  const result = await uploadMultipleToCloudinary(files);
  if (!result) throw new ApiError(500, "Failed to upload images");
  return result.map((file) => ({
    url: file.secure_url,
    public_id: file.public_id,
  }));
};
export default uploadImages ; 