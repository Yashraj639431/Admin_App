import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/pCategory/pCategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import { createProducts, resetState } from "../features/product/productSlice";
import { deleteImages, uploadImages } from "../features/upload/uploadSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Colors is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const productCategoryState = useSelector(
    (state) => state.pCategory.pCategory
  );
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i._id,
    });
  });
  
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div className="mb-3">
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              value={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              val={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>

          <div className="mb-3">
            <CustomInput
              type="number"
              label="Enter Product Price"
              name="price"
              onChng={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>

          <select
            id=""
            name="brand"
            className="form-control py-3 mb-3"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            id=""
            name="category"
            className="form-control py-3 mb-3"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
          >
            <option value="">Select Category</option>
            {productCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            id=""
            name="tags"
            className="form-control py-3 mb-3"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>

          <div className="mb-3">
            <CustomInput
              type="number"
              name="quantity"
              label="Enter Product Quantity"
              onChng={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>

          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImages(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImages(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
