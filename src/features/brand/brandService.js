import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Brands
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  return response.data;
};

// Create a Brands
const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);
  return response.data;
};

// Get a Brand
const getABrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};

// Update a Brand
const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data;
};

// Delete a Brand
const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getABrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
