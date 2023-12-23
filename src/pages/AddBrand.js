import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBrands,
  getABrands,
  updateBrands,
  resetState,
} from "../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
});

const AddBrand = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getBrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    updatedBrand,
    brandName,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrands(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully");
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateBrands(data));
        dispatch(resetState());
      } else {
        dispatch(createBrands(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getBrandId !== undefined ? "Update " : "Add "}
        Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            id="brand"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBrandId !== undefined ? "Update " : "Add "} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
