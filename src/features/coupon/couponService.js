import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Coupons
const getCoupon = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  return response.data;
};

// Create a Coupon
const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);
  return response.data;
};

// Get a Coupon
const getACoupon = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  return response.data;
};

// Update a Coupon
const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.couponData.name,
      expiry: coupon.couponData.expiry,
      discount: coupon.couponData.discount,
    },
    config
  );
  return response.data;
};

// Delete a Coupon
const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupon,
  createCoupon,
  getACoupon,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
