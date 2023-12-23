import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Blogs
const getBlog = async () => {
  const response = await axios.get(`${base_url}blog/`);
  return response.data;
};

// Create a Blog
const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/`, blog, config);
  return response.data;
};

// Get a Blog
const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  return response.data;
};

// Update a Blog
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.image,
    },
    config
  );
  return response.data;
};

// Delete a Blog
const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlog,
  createBlog,
  getABlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
