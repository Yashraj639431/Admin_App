import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Products
const getProductCategory = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

// Create a Product
const createProductCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
}

// Get a Product
const getAProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};

// Update a Product
const updateProductCategory = async (categories) => {
  const response = await axios.put(
    `${base_url}category/${categories.id}`,
    { title: categories.pCategoryData.title },
    config
  );
  return response.data;
};

// Delete a Product
const deleteProductCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};

const pCategoryService = {
  getProductCategory,
  createProductCategory,
  getAProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

export default pCategoryService;
