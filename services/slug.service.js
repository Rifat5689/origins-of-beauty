import Product from "../modules/product/product.model.js";
import ApiError from "../utils/ApiError.js";
import { createSlug } from "../server/src/utils/slug.js";

export const generateUniqueSlug= async (text, excludeId = null) => {
  const baseSlug = createSlug(text);

  if (!baseSlug) {
    throw new ApiError(400, "Slug is required");
  }

  let slug = baseSlug;
  let count = 2;

  while (
    await Product.exists({
      slug,
      ...(excludeId && { _id: { $ne: excludeId } }),
    })
  ) {
    slug = `${baseSlug}-${count++}`;
  }

  return slug;
};