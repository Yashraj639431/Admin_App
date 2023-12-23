import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosconfig";

// Get all Enquiry
const getEnquiry = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

// Delete a Enquiry
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data;
};

// Get a Enquiry
const getAEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`, config);
  return response.data;
};

// Update a Enquiry
const updateEnquiry = async (enquiry) => {
  const response = await axios.put(
    `${base_url}enquiry/${enquiry.id}`,
    { status: enquiry.enqData },
    config
  );
  return response.data;
};

const enquiryService = {
    getEnquiry,
    deleteEnquiry,
    getAEnquiry,
    updateEnquiry,
};
export default enquiryService;
