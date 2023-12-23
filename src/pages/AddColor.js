import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createColors,
  getAColors,
  updateColors,
  resetState,
} from "../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getcolorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (getcolorId !== undefined) {
      dispatch(getAColors(getcolorId));
    } else {
      dispatch(resetState());
    }
  }, [getcolorId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");
    }
    if (updatedColor && isSuccess) {
      toast.success("Color Updated Successfully");
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getcolorId !== undefined) {
        const data = { id: getcolorId, colorData: values };
        dispatch(updateColors(data));
      } else {
        dispatch(createColors(values));
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
        {" "}
        {getcolorId !== undefined ? "Update " : "Add "}
        Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
            id="color"
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
            {getcolorId !== undefined ? "Update " : "Add "}
            Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
