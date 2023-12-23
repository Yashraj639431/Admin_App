import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Colors
const getColor = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data;
};

// Create a Color
const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);
  return response.data;
};

// Get a Color
const getAColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);
  return response.data;
};

// Update a Color
const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    config
  );
  return response.data;
};

// Delete a Color
const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColor,
  createColor,
  getAColor,
  updateColor,
  deleteColor,
};

export default colorService;
