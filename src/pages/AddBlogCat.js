import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createBlogCategories,
  getABlogCategories,
  updateBlogCategories,
  resetState,
} from "../features/bCategory/bCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";

let schema = yup.object().shape({
  title: yup.string().required("Blog Category is Required"),
});
const AddBlogCat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getbcatId = location.pathname.split("/")[3];
  const newBlogCat = useSelector((state) => state.bCategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    updatedbCategory,
    bcategoryName,
  } = newBlogCat;

  useEffect(() => {
    if (getbcatId !== undefined) {
      dispatch(getABlogCategories(getbcatId));
    } else {
      dispatch(resetState());
    }
  }, [getbcatId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!");
    }
    if (updatedbCategory && isSuccess) {
      toast.success("Blog Category Updated Successfully");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdBlogCategory,
    updatedbCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bcategoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getbcatId !== undefined) {
        const data = { id: getbcatId, bCategoryData: values };
        dispatch(updateBlogCategories(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategories(values));
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
        {getbcatId !== undefined ? "Update " : "Add "}
        Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            id="bCategory"
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
            {getbcatId !== undefined ? "Update " : "Add "}
            Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
