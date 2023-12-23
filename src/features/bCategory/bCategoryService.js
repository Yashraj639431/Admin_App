import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Blogs Category
const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blog-category/`);
  return response.data;
};

// Create a Blog Category
const createBlogCategory = async (blog) => {
  const response = await axios.post(`${base_url}blog-category/`, blog, config);
  return response.data;
};

// Get a Blog Category
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blog-category/${id}`, config);
  return response.data;
};

// Update a Blog Category
const updateBlogCategory = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blog-category/${blogCat.id}`,
    { title: blogCat.bCategoryData.title },
    config
  );
  return response.data;
};

// Delete a Blog Category
const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blog-category/${id}`, config);
  return response.data;
};

const bCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};

export default bCategoryService;
