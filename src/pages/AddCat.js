import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createProductCategories,
  getAProductCategories,
  updateProductCategories,
  resetState,
} from "../features/pCategory/pCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Category is Required"),
});

const AddCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getcatId = location.pathname.split("/")[3];
  const newProductCat = useSelector((state) => state.pCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProductCategory,
    updatedCategory,
    categoryName,
  } = newProductCat;

  useEffect(() => {
    if (getcatId !== undefined) {
      dispatch(getAProductCategories(getcatId));
    } else {
      dispatch(resetState());
    }
  }, [getcatId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Product Category Added Successfully!");
    }
    if (updatedCategory && isSuccess) {
      toast.success("Product Category Updated Successfully");
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdProductCategory,
    updatedCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getcatId !== undefined) {
        const data = { id: getcatId, pCategoryData: values };
        dispatch(updateProductCategories(data));
      } else {
        dispatch(createProductCategories(values));
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
        {getcatId !== undefined ? "Update " : "Add "}
        Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
            id="pCategory"
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
            {getcatId !== undefined ? "Update " : "Add "}
            Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
